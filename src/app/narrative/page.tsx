import React from 'react';
import NarrationInputs from '@/components/narrative/NarrationInputs';
import BackArrow from '@/atoms/BackArrow';

const NarrativePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex items-center w-full py-5 px-4 top-0 dark:shadow-slate-700 dark:shadow-sm shadow-slate-200 shadow-sm">
        <BackArrow></BackArrow>
        <h1 className="font-bold text-black text-2xl mx-auto dark:text-white">
          Patient Narration
        </h1>
      </div>
      <NarrationInputs />
    </div>
  );
};

export default NarrativePage;
