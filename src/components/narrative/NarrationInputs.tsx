'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import NarrationDropdown from './NarrationDropdown';
import MultiSelectDropdown from './MultiSelectDropdown';
import SelectedPatientsTable from './SelectedPatientsTable';
import { toast } from 'sonner';
import Link from 'next/link';

const NARRATIONS_TYPE_LIST = ['Type A', 'Type B', 'Type C', 'Type D', 'Type E'];

export interface IPatientData {
  patientId: string;
  site: string;
  informedConsentDate: string;
  demographics: string[];
}

const NarrationInputs = () => {
  // datastructures for site,patient data from the input file
  const [sites, setSites] = useState<string[]>([]); // unique site names
  const [sitePatientMap, setSitePatientMap] = useState<
    Record<string, string[]>
  >({}); // mapping of unique site name to patiend Ids associated with that site
  const [patientData, setPatientData] = useState<IPatientData[]>([]); // patient data from the input file
  const [narrations, setNarrations] = useState<string[]>([]); // Narrations names
  const [patientIds, setPatientIds] = useState<string[]>([]); // Patient Ids for the select patient menu

  // datastructures for user selected site, patient, narration options
  const [selectedSites, setSelectedSites] = useState<string[]>([]); // user selected sites
  const [selectedNarration, setSelectedNarration] = useState<string>(); // user selected narration
  const [selectedPatientIds, setSelectedPatientIds] = useState<string[]>([]); // user selected patient Ids

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
    setSelectedPatientIds((prev) => [...prev, patientId]);
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
  const handlePatientSelectAll = (allSelceted: boolean) => {
    if (allSelceted) setSelectedPatientIds(patientIds);
    else setSelectedPatientIds([]);
  };

  // Function executed when file is uploaded
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      readExcelFile(file);
    } else {
      toast.error('Please select a valid Excel file (.xlsx).');
    }
    setNarrations(NARRATIONS_TYPE_LIST);
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
                patientId: `${patientId}`,
                site: row[3] ? row[3] : 'NA',
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
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx"
          className="rounded-lg py-6 px-10 border-2 my-4"
        />
      </div>
      <div className="flex items-start gap-8">
        <NarrationDropdown
          narrations={narrations}
          selectedNarration={selectedNarration}
          setSelectedNarration={setSelectedNarration}
        ></NarrationDropdown>
        <MultiSelectDropdown
          options={sites}
          selectedOptions={selectedSites}
          onSelect={handleSiteSelect}
          onUnselect={handleSiteUnselect}
          onSelectAll={handleSiteSelectAll}
          columnName="Sites"
          disabled={!selectedNarration}
        ></MultiSelectDropdown>
        <MultiSelectDropdown
          options={patientIds}
          selectedOptions={selectedPatientIds}
          onSelect={handlePatientSelect}
          onUnselect={handlePatientUnselect}
          onSelectAll={handlePatientSelectAll}
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
            !narrations ||
            selectedSites.length === 0 ||
            selectedPatientIds.length === 0
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
  );
};

export default NarrationInputs;
