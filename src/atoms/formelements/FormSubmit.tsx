'use client';

// Reusable form submit button, utilizes form submit status to show loading state.

import { useFormStatus } from 'react-dom';
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '@/components/ui/button';

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
    <Button
      type="submit"
      disabled={pending}
      className={`min-w-40 font-bold flex justify-center items-center ${className}`}
    >
      {pending ? (
        <LoadingSpinner className="h-6 w-6"></LoadingSpinner>
      ) : (
        children
      )}
    </Button>
  );
};

export default FormSubmit;
