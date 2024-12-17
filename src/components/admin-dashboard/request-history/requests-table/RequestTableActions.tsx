'use client';

import { RevalidatePathAction } from '@/actions/revalidatdata.action';
import LoadingSpinner from '@/atoms/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { DownloadIcon, ReloadIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { memo, useState } from 'react';

interface RequestTableActionsProps {
  handleExport: () => void;
}

const RequestTableActions = ({ handleExport }: RequestTableActionsProps) => {
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    RevalidatePathAction(pathName);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className="w-full flex items-center justify-end  gap-4 my-2">
      <Button onClick={handleExport} className="flex items-center gap-2">
        <DownloadIcon className="h-4 w-4"></DownloadIcon>
        Export Table
      </Button>
      <Button
        className="flex gap-2 items-center min-w-32"
        onClick={handleRefresh}
      >
        {isLoading ? (
          <LoadingSpinner className="h-4 w-4"></LoadingSpinner>
        ) : (
          <>
            <ReloadIcon /> Refresh
          </>
        )}
      </Button>
    </div>
  );
};

export default memo(RequestTableActions);
