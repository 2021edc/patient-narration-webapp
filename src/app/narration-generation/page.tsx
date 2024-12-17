import React from 'react';
import NarrationGeneration from '@/components/narrative/NarrationGeneration';
import PageHeader from '@/atoms/PageHeader';

const NarrativePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <PageHeader pageTitle={'Patient Narration Assistant'}></PageHeader>
      <div className="max-w-[1440px] mx-auto p-4 w-full">
        <NarrationGeneration></NarrationGeneration>
      </div>
    </div>
  );
};

export default NarrativePage;
