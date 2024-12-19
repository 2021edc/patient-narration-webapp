'use client';

import React, { useCallback, useMemo, useState } from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';
import SelectedSubjectsTable from './SelectedPatientsTable';
import { toast } from 'sonner';
import { API_METHODS, APP_PATHS, MAX_SUBJECT_LIMIT } from '@/constants';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  ExtractedSubjects,
  INarrationParsedData,
  ISubjectData,
} from '@/types/api/narration';
import LoadingSpinner from '@/atoms/LoadingSpinner';
import { api_narration_generate_narration } from '@/utils/url-helper';
import getTokenClientSide from '@/services/getTokenClientSide';
import { useRouter } from 'next/navigation';
import handleMissingFieldsError from '@/services/handleMissingFieldsError';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';
import { RevalidatePathAction } from '@/actions/revalidatdata.action';

interface NarrationInputsProps {
  narrationData: INarrationParsedData;
  narrationFile: File;
  selectedNarration: string;
}

const NarrationInputs = ({
  narrationData,
  narrationFile,
  selectedNarration,
}: NarrationInputsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  // function to extract all subjects from the parsed data from backend api
  const allSubjectsData = useMemo(() => {
    const result: ExtractedSubjects = {};
    for (const [, subjects] of Object.entries(narrationData)) {
      for (const [subjectId, subjectData] of Object.entries(subjects)) {
        result[subjectId] = { ...subjectData };
      }
    }
    return result;
  }, [narrationData]);

  const sites = useMemo(() => Object.keys(narrationData), [narrationData]); // Unique site values for Select site dropdown
  const [subjectIds, setSubjectIds] = useState<string[]>([]); // Subject Ids for the select subject menu

  const [selectedSites, setSelectedSites] = useState<string[]>([]); // user selected sites
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]); // user selected subject Ids
  const [selectedSubjectsData, setSelectedSubjectsData] = useState<
    ISubjectData[]
  >([]);

  // Function executed to reset all the fields
  const resetInputs = useCallback(() => {
    setSelectedSites([]);
    setSubjectIds([]);
    setSelectedSubjectIds([]);
  }, []);

  // Function executed when a site is selected in dropdown. add particular selected site to selected-sites list,
  // and add all subjects for the selected site to subjects dropdown
  const handleSiteSelect = (selectedSite: string) => {
    setSelectedSites((prev) => [...prev, selectedSite]);
    setSubjectIds((prev) => {
      const subjects = Object.keys(narrationData[selectedSite]);
      return [...prev, ...subjects];
    });
  };

  // Function executed when a site is un-selected in dropdown, removes site from selected-sites list
  // removes all subject ids for that site from subjects dropdown
  // removes all related subject ids if they are previously selected
  const handleSiteUnselect = (unselectedSite: string) => {
    setSelectedSites((prev) => [
      ...prev.filter((site) => site !== unselectedSite),
    ]);
    const unselectSubjectIds = Object.keys(narrationData[unselectedSite]);
    setSubjectIds((prev) =>
      prev.filter((id) => !unselectSubjectIds.includes(id))
    );
    setSelectedSubjectIds((prev) =>
      prev.filter((id) => !unselectSubjectIds.includes(id))
    );
  };

  // Function executed when a subject Id is selected in dropdown
  // adds subject id to list of selected subjects
  // adds subject data to list of selected subjects data
  const handleSubjectSelect = (subjectId: string) => {
    if (selectedSubjectIds.length < MAX_SUBJECT_LIMIT) {
      setSelectedSubjectIds((prev) => [...prev, subjectId]);
      const subjectData = allSubjectsData[subjectId];
      setSelectedSubjectsData((prev) => [...prev, subjectData]);
    } else {
      toast.error(`Max subject limit: ${MAX_SUBJECT_LIMIT} reached`);
    }
  };

  // Function executed when a subject Id is un-selected in dropdown
  // removes subject from selected subject list
  // removes subject's data from selected subjects data list
  const handleSubjectUnselect = (subjectId: string) => {
    setSelectedSubjectIds((prev) => prev.filter((id) => id !== subjectId));
    setSelectedSubjectsData((prev) =>
      prev.filter((subject) => subject.subject !== subjectId)
    );
  };

  // Function executed when select all/ reset is pressed in site dropdown
  // when true - adds all site ids from dropdown to selected sites, adds all subjects to subjects dropdown
  // whem false - removes all ids from selected sites, removes all subjects from dropdown
  const handleSiteSelectAll = (allSelected: boolean) => {
    if (allSelected) {
      setSelectedSites(sites);
      const ids: string[] = [];
      sites.forEach((site) => {
        ids.push(...Object.keys(narrationData[site]));
      });
      setSubjectIds(ids);
    } else {
      setSelectedSites([]);
      setSubjectIds([]);
      setSelectedSubjectIds([]);
    }
  };

  // Function executed when select all or reset is pressed in subject dropdown
  // when true - add first 30 subjects to selected subjects, add first 30 subject data to selected subjects data list
  // when false- removes all subjects ids, subject data from selected subject ids and selected subject data list
  const handleSubjectSelectAll = (allSelected: boolean) => {
    if (allSelected) {
      const selectedIds = subjectIds.slice(0, MAX_SUBJECT_LIMIT);
      setSelectedSubjectIds(selectedIds);
      const subjectDetails = selectedIds.map((id) => allSubjectsData[id]);
      setSelectedSubjectsData(subjectDetails);
      if (subjectIds.length > MAX_SUBJECT_LIMIT) {
        toast.message(`Max subject limit: ${MAX_SUBJECT_LIMIT} selected`);
      }
    } else {
      setSelectedSubjectIds([]);
      setSelectedSubjectsData([]);
    }
  };

  // call server action to post the narration input file, list of selected subjects and narration type to backend api
  // on successful response show toast message with link to request history page
  const handleGenerateNarration = async () => {
    setError(undefined);
    setLoading(true);

    // get auth token from api route handler, if token not present redirect to login
    const token = await getTokenClientSide();
    if (!token) {
      router.replace('/login');
      return;
    }

    // input file as Form Data for posting to backend
    const formData = new FormData();
    formData.append('narration_file', narrationFile);

    // Making post request to the backend
    const response = await fetch(
      api_narration_generate_narration({
        narration_type: selectedNarration,
        filter_value: selectedSubjectIds.join(','),
      }),
      {
        method: API_METHODS.POST,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // handle API error if any
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error(errorResponse);
      if (errorResponse.detail && errorResponse.detail instanceof Array) {
        const errorMsg = handleMissingFieldsError(errorResponse.detail);
        setError(errorMsg);
      }
      setError(
        handleUnauthorizedStatusCode(response.status) || errorResponse.message
      );
      setLoading(false);
      return;
    }
    // Get data from backend api
    const data = await response.json();
    if (data) {
      resetInputs();
      RevalidatePathAction(APP_PATHS.REQUEST_HISTORY);
      toast.success('Narration generation process started.', {
        duration: 3000,
        className: 'w-max right-0',
        action: (
          <Button>
            <Link href={'/requests?page=1'} className="text-sm">
              View Status
            </Link>
          </Button>
        ),
      });
      setLoading(false);
      return;
    } else {
      toast.error('Unable to post data for narration generation');
    }
    setLoading(false);
  };

  return (
    <div className="w-full text-gray-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 w-full">
        <div className="col-span-2">
          <MultiSelectDropdown
            key={'siteselection'}
            optionsList={sites}
            selectedOptions={selectedSites}
            onSelect={handleSiteSelect}
            onUnselect={handleSiteUnselect}
            onSelectAll={handleSiteSelectAll}
            selectAllLimit={sites.length}
            columnName="Sites"
          ></MultiSelectDropdown>
        </div>
        <div className="col-span-2">
          <MultiSelectDropdown
            key={'subjectselection'}
            optionsList={subjectIds}
            selectedOptions={selectedSubjectIds}
            onSelect={handleSubjectSelect}
            onUnselect={handleSubjectUnselect}
            onSelectAll={handleSubjectSelectAll}
            selectAllLimit={
              subjectIds.length > 30 ? MAX_SUBJECT_LIMIT : subjectIds.length
            }
            columnName="Subjects"
            disabled={selectedSites.length === 0}
          ></MultiSelectDropdown>
        </div>

        <div className="">
          <Button
            className="min-w-40 bg-dark-gray dark:bg-light-bg font-bold text-light-text dark:text-dark-text py-6"
            onClick={() => resetInputs()}
          >
            Reset
          </Button>
        </div>
      </div>
      <SelectedSubjectsTable
        selectedSubjectIds={selectedSubjectIds}
        subjectData={selectedSubjectsData}
      ></SelectedSubjectsTable>
      <div className="mt-10 border w-max mx-auto">
        <Button
          className="min-w-48 bg-dark-gray dark:bg-white text-white px-4 py-6 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={
            selectedSites.length === 0 ||
            selectedSubjectIds.length === 0 ||
            selectedSubjectIds.length > MAX_SUBJECT_LIMIT ||
            loading
          }
          onClick={handleGenerateNarration}
        >
          {loading ? (
            <LoadingSpinner className="h-6 w-6"></LoadingSpinner>
          ) : (
            'Generate Narration'
          )}
        </Button>
      </div>
      <p className="mb-2 text-red-800 dark:text-red-500 text-center min-h-2 my-6">
        {error}
      </p>
    </div>
  );
};

export default NarrationInputs;
