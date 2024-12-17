import FormSubmit from '@/atoms/formelements/FormSubmit';
import { Input } from '../ui/input';
import { INarrationParsedData } from '@/types/api/narration';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { IUploadNarrationFileFormState } from '@/types';
import ProcessNarrationFileAction from '@/actions/narration/process-narration-file.action';
import NarrationDropdown from './NarrationDropdown';

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
  const inputFileRef = useRef<HTMLInputElement>(null);

  const initialFormState: IUploadNarrationFileFormState = {
    success: false,
    errors: { _form: [] },
  };
  const [formState, formAction] = useFormState(
    ProcessNarrationFileAction,
    initialFormState
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileData(undefined);
    if (e.currentTarget.files) {
      setInputFile(e.currentTarget.files[0]);
    }
  };

  useEffect(() => {
    if (formState.success && formState.data) {
      setFileData(formState.data);
    }
  }, [formState, setFileData]);

  const handleNarrationChange = (narrationType: string) => {
    setSelectedNarration(narrationType);
    setInputFile(null);
    setFileData(undefined);
    if (inputFileRef.current) inputFileRef.current.value = '';
  };

  return (
    <>
      {' '}
      <form
        action={formAction}
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
          <FormSubmit className="!py-6" disabled={!selectedNarration}>
            Submit
          </FormSubmit>
        </div>
      </form>
      <p className="mb-2 text-red-800 dark:text-red-500 text-sm min-h-2">
        {formState.errors._form?.join(',')}
      </p>
    </>
  );
};

export default NarrationFileUpload;
