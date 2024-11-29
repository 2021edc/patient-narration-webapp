'use client';

import React, { useCallback, useMemo, useState } from 'react';
import NarrationDropdown from './NarrationDropdown';
import MultiSelectDropdown from './MultiSelectDropdown';
import SelectedSubjectsTable from './SelectedPatientsTable';
import { toast } from 'sonner';
import { MAX_SUBJECT_LIMIT } from '@/constants';
import { Button } from '../ui/button';
import GenerateNarrationAction from '@/actions/narration/generatenarration.action';
import Link from 'next/link';
import {
  ExtractedSubjects,
  INarrationParsedData,
  ISubjectData,
} from '@/types/api/narration';
import LoadingSpinner from '@/atoms/LoadingSpinner';

interface NarrationInputsProps {
  narrationData: INarrationParsedData;
  narrationFile: File;
}

const NarrationInputs = ({
  narrationData,
  narrationFile,
}: NarrationInputsProps) => {
  const [loading, setLoading] = useState(false);

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

  const sites = Object.keys(narrationData); // Unique site values for Select site dropdown
  const [subjectIds, setSubjectIds] = useState<string[]>([]); // Subject Ids for the select subject menu

  const [selectedSites, setSelectedSites] = useState<string[]>([]); // user selected sites
  const [selectedNarration, setSelectedNarration] = useState<string>(); // user selected narration
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]); // user selected subject Ids
  const [selectedSubjectsData, setSelectedSubjectsData] = useState<
    ISubjectData[]
  >([]);

  // Function executed to reset all the fields
  const resetInputs = useCallback(() => {
    setSelectedSites([]);
    setSubjectIds([]);
    setSelectedSubjectIds([]);
    setSelectedNarration(undefined);
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
    setLoading(true);
    if (!selectedNarration) {
      toast.error('Select valid narration type');
      return;
    }
    if (selectedSubjectIds.length === 0) {
      toast.error('Select subjects');
      return;
    }

    const formData = new FormData();
    formData.append('narration_file', narrationFile);
    const { error, data } = await GenerateNarrationAction(
      selectedNarration,
      selectedSubjectIds.join(','),
      formData
    );
    if (error) {
      toast.error(error);
    }
    if (data) {
      resetInputs();
      toast.success('Narration generation process started.', {
        duration: 3000,
        className: 'w-max right-0',
        action: (
          <Button>
            <Link href={'/requests'} className="text-sm">
              View Status
            </Link>
          </Button>
        ),
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-4 text-center w-full text-gray-900 dark:text-white">
      <div className="w-full">
        <div className="flex items-start gap-8 w-full">
          <NarrationDropdown
            disabled={false}
            selectedNarration={selectedNarration}
            setSelectedNarration={setSelectedNarration}
          ></NarrationDropdown>
          <MultiSelectDropdown
            key={'siteselection'}
            optionsList={sites}
            selectedOptions={selectedSites}
            onSelect={handleSiteSelect}
            onUnselect={handleSiteUnselect}
            onSelectAll={handleSiteSelectAll}
            selectAllLimit={sites.length}
            columnName="Sites"
            disabled={!selectedNarration}
          ></MultiSelectDropdown>
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
          <Button
            className="min-w-40 bg-dark-gray dark:bg-light-bg font-bold text-light-text dark:text-dark-text py-5 rounded-lg"
            onClick={() => resetInputs()}
          >
            Reset
          </Button>
        </div>
        <SelectedSubjectsTable
          selectedSubjectIds={selectedSubjectIds}
          subjectData={selectedSubjectsData}
        ></SelectedSubjectsTable>
        <div className="mt-10">
          <Button
            className="min-w-48 bg-dark-gray dark:bg-white text-white px-4 py-5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
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
      </div>
    </div>
  );
};

export default NarrationInputs;
