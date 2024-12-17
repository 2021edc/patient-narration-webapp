'use client';

// Reusable form submit button, utilizes form submit status to show loading state.

import { useFormStatus } from 'react-dom';
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

interface FormSubmitProps {
  children?: React.ReactNode | string;
  className?: string;
  disabled?: boolean;
}

const FormSubmit = ({
  children = 'Submit',
  className = '',
  disabled = false,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || disabled}
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

export default memo(FormSubmit);
