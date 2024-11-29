'use client';

import GetDownloadLinkAction from '@/actions/narration/getdownloadlink.action';
import LoadingBars from '@/atoms/LoadingBars';
// Dialog component that checks for narration zip file and provides option to download the file
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface DownloadFileDialogProps {
  requestId: string | null;
  open: boolean;
  setOpen: () => void;
}
const DownloadFileDialog = ({
  requestId,
  open,
  setOpen,
}: DownloadFileDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  // resetting link when download popup is opened multiple times
  useEffect(() => {
    if (open) {
      setDownloadLink(null);
    }
  }, [open]);

  if (!requestId) return <></>;

  // calling server action to get download link
  const handleGetLink = async () => {
    setLoading(true);
    const { data, error } = await GetDownloadLinkAction(requestId);
    if (error) {
      toast.error(error);
    }
    if (data) {
      setDownloadLink(data);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download</DialogTitle>
          <DialogDescription>
            Download narration zip file - {requestId}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 items-center">
          <Button
            className="min-w-40"
            onClick={handleGetLink}
            disabled={!!downloadLink}
          >
            {loading ? <LoadingBars></LoadingBars> : 'Get Link'}
          </Button>
          {downloadLink && (
            <Link className="underline" href={downloadLink}>
              Download
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadFileDialog;
