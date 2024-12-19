import { Input } from '../ui/input';
import { INarrationParsedData } from '@/types/api/narration';
import { useRef, useState } from 'react';
import NarrationDropdown from './NarrationDropdown';
import getTokenClientSide from '@/services/getTokenClientSide';
import { useRouter } from 'next/navigation';
import { api_narration_process_file } from '@/utils/url-helper';
import { API_METHODS } from '@/constants';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';
import handleMissingFieldsError from '@/services/handleMissingFieldsError';
import { Button } from '../ui/button';
import LoadingSpinner from '@/atoms/LoadingSpinner';

interface NarrationFileUploadProps {
  setFileData: React.Dispatch<
    React.SetStateAction<INarrationParsedData | undefined>
  >;
  setInputFile: React.Dispatch<React.SetStateAction<File | null>>;
  selectedNarration: string | undefined;
  setSelectedNarration: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

// file upload component.

const NarrationFileUpload = ({
  setFileData,
  setInputFile,
  selectedNarration,
  setSelectedNarration,
}: NarrationFileUploadProps) => {
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [fileUploading, setFileUploading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    setFileUploading(true);
    e.preventDefault();
    if (e.currentTarget) {
      // Get file and narration type from the form data
      const formData = new FormData(e.currentTarget);
      const narration_type = formData.get('narration_type') as string;
      const narration_file = formData.get('narration_file') as File;

      if (!narration_type) {
        setError('Select Narration type');
        setFileUploading(false);
      }

      if (!narration_file || narration_file.name === 'undefined') {
        setError('Select an input file');
        setFileUploading(false);
        return;
      }

      // get auth token from api route handler, if token not present redirect to login
      const token = await getTokenClientSide();
      if (!token) {
        router.replace('/login');
        return;
      }

      // Make Post request to api with file and narration type
      const response = await fetch(api_narration_process_file(narration_type), {
        method: API_METHODS.POST,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // handle API response error if any
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(errorResponse);
        if (errorResponse.detail && errorResponse.detail instanceof Array) {
          const errorMsg = handleMissingFieldsError(errorResponse.detail);
          setError(errorMsg);
        }
        setError(
          handleUnauthorizedStatusCode(response.status) || errorResponse.message
        );
        setFileUploading(false);
        return;
      }

      // Set the parsed file data to parent state
      const data = await response.json();
      if (data) {
        setFileData(data);
        setFileUploading(false);
        return;
      }
    }
    setError('Unable to upload file');
    setFileUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileData(undefined);
    setError(undefined);
    if (e.currentTarget.files) {
      setInputFile(e.currentTarget.files[0]);
    }
  };

  const handleNarrationChange = (narrationType: string) => {
    setSelectedNarration(narrationType);
    setInputFile(null);
    setFileData(undefined);
    setError(undefined);
    if (inputFileRef.current) inputFileRef.current.value = '';
  };

  return (
    <>
      {' '}
      <form
        onSubmit={handleFileUpload}
        className="grid grid-cols-1 lg:grid-cols-5 gap-4 w-full mb-8"
      >
        <div className="col-span-2">
          <NarrationDropdown
            setSelectedNarration={handleNarrationChange}
          ></NarrationDropdown>
        </div>
        <div className="col-span-2">
          <Input
            type="file"
            accept=".xlsx"
            className="rounded-lg border-2 !h-12 py-3"
            ref={inputFileRef}
            name="narration_file"
            id="narration_file"
            onChange={handleFileChange}
            disabled={!selectedNarration}
          />
        </div>

        <div>
          <Button
            type="submit"
            className="min-w-40 bg-dark-gray dark:bg-light-bg font-bold text-light-text dark:text-dark-text py-6"
            disabled={
              !selectedNarration ||
              fileUploading ||
              !inputFileRef.current?.value
            }
          >
            {fileUploading ? <LoadingSpinner className="h-6 w-6" /> : 'Submit'}
          </Button>
        </div>
      </form>
      <p className="mb-2 text-red-800 dark:text-red-500 text-sm min-h-2">
        {error}
      </p>
    </>
  );
};

export default NarrationFileUpload;
