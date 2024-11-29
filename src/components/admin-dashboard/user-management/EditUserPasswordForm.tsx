'use client';

import UpdatePasswordAction from '@/actions/admin-panel/updatepassword.action';
import FormSubmit from '@/atoms/formelements/FormSubmit';
import { IUpdatePasswordFormState } from '@/types';
import { IAdminUserInfo } from '@/types/api/admin';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { CopyIcon } from '@radix-ui/react-icons';

interface EditUserPasswordFormProps {
  userInfo: IAdminUserInfo;
}

// component renders a form to generate password and display newly generated password

const EditUserPasswordForm = ({ userInfo }: EditUserPasswordFormProps) => {
  const initialState: IUpdatePasswordFormState = {
    success: false,
    errors: {},
  };
  const bindedAction = UpdatePasswordAction.bind(null, userInfo.user_id);
  const [formState, formAction] = useFormState(bindedAction, initialState);

  useEffect(() => {
    if (formState.success && formState.data) {
      toast.success('New password generated.');
    }
  }, [formState.success, formState.data]);

  const handleCopy = (password: string | undefined) => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success('Password copied');
    }
  };

  return (
    <div className="my-4 p-4 border-2 rounded-lg">
      <h3 className="text-lg font-semibold pb-2 border-b-2">
        Generate New Password
      </h3>
      <div className="flex flex-col gap-4 my-4">
        <form autoComplete="off" action={formAction}>
          <FormSubmit className="!px-4">Generate New Password</FormSubmit>
        </form>
        <div className="w-full mb-1">
          <label htmlFor="password" className="text-light-gray mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              autoComplete="new-password"
              readOnly
              value={formState.data ? formState.data.newPassword : ''}
              className="w-full p-2 border text-dark-gray border-light-gray rounded-lg"
            />
            <button
              className="absolute top-1/4 right-2 disabled:opacity-40"
              disabled={!formState.data?.newPassword?.length}
              onClick={() => handleCopy(formState.data?.newPassword)}
            >
              <CopyIcon className="h-6 w-6 text-gray-700"></CopyIcon>
            </button>
          </div>
        </div>

        <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
          {formState.errors._form?.join(',')}
        </p>
      </div>
    </div>
  );
};

export default EditUserPasswordForm;
