import FormSubmit from '@/atoms/formelements/FormSubmit';
import { Input } from '../ui/input';
import { INarrationParsedData } from '@/types/api/narration';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { IUploadNarrationFileFormState } from '@/types';
import ProcessNarrationFileAction from '@/actions/narration/process-narration-file.action';

interface NarrationFileUploadProps {
  setFileData: React.Dispatch<
    React.SetStateAction<INarrationParsedData | undefined>
  >;
  setInputFile: React.Dispatch<React.SetStateAction<File | null>>;
}

// file upload component.

const NarrationFileUpload = ({
  setFileData,
  setInputFile,
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
  }, [formState.success, formState.data, setFileData]);

  return (
    <form action={formAction}>
      <div className="flex gap-4 items-center mb-2">
        <Input
          type="file"
          accept=".xlsx"
          className="rounded-lg border-2 w-80 !h-12 py-3"
          ref={inputFileRef}
          name="narration_file"
          id="narration_file"
          onChange={handleFileChange}
        />
        <FormSubmit className="!py-6">Submit</FormSubmit>
      </div>

      <p className="mb-2 text-red-800 dark:text-red-500 text-xs min-h-2 max-w-80">
        {formState.errors._form?.join(',')}
      </p>
    </form>
  );
};

export default NarrationFileUpload;
