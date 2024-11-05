'use client';

import { useFormStatus } from 'react-dom';
import LoadingSpinner from './LoadingSpinner';

interface FormSubmitProps {
  children?: React.ReactNode | string;
  className?: string;
}

const FormSubmit = ({
  children = 'Submit',
  className = '',
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`min-w-40 bg-dark-gray dark:bg-light-bg font-bold text-light-text dark:text-dark-text py-2 rounded-lg flex justify-center items-center ${className}`}
    >
      {pending ? (
        <LoadingSpinner className="h-6 w-6"></LoadingSpinner>
      ) : (
        children
      )}
    </button>
  );
};

export default FormSubmit;
