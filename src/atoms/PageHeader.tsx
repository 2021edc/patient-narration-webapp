// Reusable header element for page titles

import BackArrow from './BackArrow';

interface PageHeaderProps {
  pageTitle: string;
}

const PageHeader = ({ pageTitle }: PageHeaderProps) => {
  return (
    <div className="w-full relative flex items-center justify-center my-8 md:my-4 py-4 border-b-2">
      <BackArrow></BackArrow>
      <h1 className="font-bold text-dark-gray dark:text-light-text text-2xl mx-auto">
        {pageTitle}
      </h1>
    </div>
  );
};

export default PageHeader;
