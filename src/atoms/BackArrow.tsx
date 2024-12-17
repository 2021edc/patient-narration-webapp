'use client';

// Back arrow, when clicked will navigate to the previous page in history stack.

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const BackArrow = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBackClick}
      className="text-gray-400 dark:text-white dark:hover:text-gray-300 hover:text-gray-900"
    >
      <ArrowLeftIcon className="h-4 w-4 lg:h-6 lg:w-6" />
    </button>
  );
};

export default BackArrow;
