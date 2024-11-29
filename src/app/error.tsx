'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import ImageWrapper from '@/atoms/ImageWrapper';
import ErrorIcon from '@public/icons/icon_error.svg';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6 items-center">
      <h2 className="text-2xl text-center font-semibold">
        We have encountered an error!
      </h2>
      <ImageWrapper
        src={ErrorIcon}
        alt={'error icon'}
        imageSize={'h-20 w-20'}
      ></ImageWrapper>
      <h3 className="text-lg text-red-700">
        {error.name} - {error.message}
      </h3>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
