'use client';

import { useState } from 'react';
import NarrationFileUpload from './NarrationFileUpload';
import { INarrationParsedData } from '@/types/api/narration';
import NarrationInputs from './NarrationInputs';

// component renders narration file upload form and inputs for user selections

const NarrationGeneration = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<INarrationParsedData | undefined>();

  return (
    <div className="w-full mx-auto flex flex-col items-center max-w-[1400px] py-6">
      <NarrationFileUpload
        setInputFile={setInputFile}
        setFileData={setFileData}
      ></NarrationFileUpload>

      {inputFile && fileData && (
        <NarrationInputs
          narrationData={fileData}
          narrationFile={inputFile}
        ></NarrationInputs>
      )}
    </div>
  );
};

export default NarrationGeneration;
