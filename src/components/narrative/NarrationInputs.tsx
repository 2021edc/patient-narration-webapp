'use client';

import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import NarrationDropdown from './NarrationDropdown';
import MultiSelectDropdown from './MultiSelectDropdown';
import SelectedPatientsTable from './SelectedPatientsTable';
import { toast } from 'sonner';
import Link from 'next/link';
import { MAX_SUBJECT_LIMIT } from '@/constants';
import FullScreenSpinner from '@/atoms/FullScreenSpinner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface IPatientData {
  patientId: string;
  site: string;
  informedConsentDate: string;
  demographics: string[];
}

const NarrationInputs = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isFileParsing, setIsFileParsing] = useState(false);

  // datastructures for site,patient data from the input file
  const [sites, setSites] = useState<string[]>([]); // unique site names
  const [sitePatientMap, setSitePatientMap] = useState<
    Record<string, string[]>
  >({}); // mapping of unique site name to patiend Ids associated with that site
  const [patientData, setPatientData] = useState<IPatientData[]>([]); // patient data from the input file
  const [patientIds, setPatientIds] = useState<string[]>([]); // Patient Ids for the select patient menu

  // datastructures for user selected site, patient, narration options
  const [selectedSites, setSelectedSites] = useState<string[]>([]); // user selected sites
  const [selectedNarration, setSelectedNarration] = useState<string>(); // user selected narration
  const [selectedPatientIds, setSelectedPatientIds] = useState<string[]>([]); // user selected patient Ids

  // Function executed to reset all the fields
  const resetFields = () => {
    setSites([]);
    setSelectedSites([]);
    setSitePatientMap({});

    setPatientData([]);
    setPatientIds([]);
    setSelectedPatientIds([]);

    setSelectedNarration(undefined);
  };

  // Function executed to reset all the fields and input file
  const handleReset = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    resetFields();
  };

  // Function executed when a site is selected in dropdown
  const handleSiteSelect = (selectedSite: string) => {
    setSelectedSites((prev) => [...prev, selectedSite]);
    setPatientIds((prev) => [...prev, ...sitePatientMap[selectedSite]]);
  };

  // Function executed when a site is un-selected in dropdown
  const handleSiteUnselect = (unselectedSite: string) => {
    setSelectedSites((prev) => [
      ...prev.filter((site) => site !== unselectedSite),
    ]);
    const unselectPatientIds = sitePatientMap[unselectedSite];
    setPatientIds((prev) =>
      prev.filter((id) => !unselectPatientIds.includes(id))
    );
    setSelectedPatientIds((prev) =>
      prev.filter((id) => !unselectPatientIds.includes(id))
    );
  };

  // Function executed when a patient Id is selected in dropdown
  const handlePatientSelect = (patientId: string) => {
    if (selectedPatientIds.length < MAX_SUBJECT_LIMIT) {
      setSelectedPatientIds((prev) => [...prev, patientId]);
    } else {
      toast.error(`Max subject limit: ${MAX_SUBJECT_LIMIT} reached`);
    }
  };

  // Function executed when a patient Id is un-selected in dropdown
  const handlePatientUnselect = (patientId: string) => {
    setSelectedPatientIds((prev) => prev.filter((id) => id !== patientId));
  };

  // Function executed when select all is pressed in site dropdown
  const handleSiteSelectAll = (allSelected: boolean) => {
    if (allSelected) {
      setSelectedSites(sites);
      const ids: string[] = [];
      sites.forEach((site) => {
        ids.push(...sitePatientMap[site]);
      });

      setPatientIds(ids);
    } else {
      setSelectedSites([]);
      setPatientIds([]);
      setSelectedPatientIds([]);
    }
  };

  // Function executed when select all is pressed in patient dropdown
  const handlePatientSelectAll = (allSelected: boolean) => {
    if (allSelected) {
      setSelectedPatientIds(patientIds.slice(0, MAX_SUBJECT_LIMIT));
      if (patientIds.length > MAX_SUBJECT_LIMIT) {
        toast.message(`Max subject limit: ${MAX_SUBJECT_LIMIT} selected`);
      }
    } else {
      setSelectedPatientIds([]);
    }
  };

  // Function executed when file is uploaded
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetFields();
    const file = event.target.files?.[0];
    if (
      file &&
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setIsFileParsing(true);
      readExcelFile(file);
    } else {
      toast.error('Please select a valid Excel file (.xlsx).');
    }
    setIsFileParsing(false);
  };

  // Function to parse the input xlsx file to read patient data from Base line sheet.
  const readExcelFile = (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, {
            type: 'array',
            cellDates: true,
          });
          const allPatientData: IPatientData[] = [];
          const baseline_sheet_name = workbook.SheetNames[0];
          const sheetDataJson = XLSX.utils.sheet_to_json(
            workbook.Sheets[baseline_sheet_name],
            {
              header: 1,
            }
          );

          // Set used to deduplicate subject ids from the document.
          const deduplicationSet = new Set();

          sheetDataJson.slice(2).forEach((row: any) => {
            const patientId = row[2]; // Assuming patient IDs are in column B
            if (patientId && !deduplicationSet.has(patientId)) {
              const patientData: IPatientData = {
                patientId: patientId.toString(),
                site: row[3] ? row[3].toString() : 'NA',
                informedConsentDate: row[4]
                  ? new Date(row[4]).toLocaleDateString()
                  : 'NA',
                demographics: row.slice(14, 21),
              };
              deduplicationSet.add(patientId);
              allPatientData.push(patientData);
            }
          });

          const uniqueSites = Array.from(
            new Set(allPatientData.map((patient) => patient.site))
          );

          const sitesPatientIdMap: Record<string, string[]> = {};
          uniqueSites.forEach((site: string) => (sitesPatientIdMap[site] = []));
          allPatientData.forEach((patient) => {
            sitesPatientIdMap[patient.site].push(patient.patientId);
          });

          setPatientData(allPatientData);
          setSites(uniqueSites);
          setSitePatientMap(sitesPatientIdMap);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      toast.error('Error reading data from input file');
    }
  };

  return (
    <div className="p-4 text-center w-full max-w-[1400px] text-gray-900 dark:text-white">
      <div className="mb-4 flex gap-4 items-center justify-center">
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx"
          className="rounded-lg border-2 w-80 !h-12 py-3 my-4"
          ref={inputFileRef}
        />
        <Button onClick={handleReset} className="px-6">
          Reset
        </Button>
      </div>
      <div className="relative">
        {isFileParsing && (
          <FullScreenSpinner title="Processing input file"></FullScreenSpinner>
        )}

        <div className="flex items-start gap-8">
          <NarrationDropdown
            disabled={!inputFileRef.current?.value.trim()}
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
            optionsList={patientIds}
            selectedOptions={selectedPatientIds}
            onSelect={handlePatientSelect}
            onUnselect={handlePatientUnselect}
            onSelectAll={handlePatientSelectAll}
            selectAllLimit={
              patientIds.length > 30 ? MAX_SUBJECT_LIMIT : patientIds.length
            }
            columnName="Patients"
            disabled={selectedSites.length === 0}
          ></MultiSelectDropdown>
        </div>
        <SelectedPatientsTable
          selectedPatientIds={selectedPatientIds}
          patientData={patientData}
        ></SelectedPatientsTable>
        <div className="mt-10">
          <button
            className="bg-gray-900 dark:bg-white text-white px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={
              selectedSites.length === 0 ||
              selectedPatientIds.length === 0 ||
              selectedPatientIds.length > MAX_SUBJECT_LIMIT
            }
          >
            <Link
              href={'/Patient_narration 10.16.29 AM.zip'}
              download={'zip'}
              className="dark:text-gray-900"
            >
              Generate Narration
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NarrationInputs;
