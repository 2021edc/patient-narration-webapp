// Spinner element that will cover the full screen.

import LoadingSpinner from './LoadingSpinner';

interface FullScreenSpinnerProps {
  title?: string;
}

const FullScreenSpinner = ({ title = '' }: FullScreenSpinnerProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]">
      <div className="w-80 h-80 rounded-xl shadow-xl flex flex-col items-center justify-center gap-6 bg-light-text">
        <h4 className="text-xl font-semibold">{title}</h4>
        <LoadingSpinner
          className="h-12 w-12"
          color="text-dark-gray"
        ></LoadingSpinner>
      </div>
    </div>
  );
};

export default FullScreenSpinner;
