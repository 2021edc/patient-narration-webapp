import UpdatePasswordAction from '@/actions/admin-panel/updatepassword.action';
import FormInputPassword from '@/atoms/formelements/FormInputPassword';
import FormSubmit from '@/atoms/formelements/FormSubmit';
import { IUpdatePasswordFormState, IUserInfo } from '@/types';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

interface EditUserPasswordFormProps {
  userInfo: IUserInfo;
}

const EditUserPasswordForm = ({ userInfo }: EditUserPasswordFormProps) => {
  const initialState: IUpdatePasswordFormState = {
    success: false,
    errors: {},
    data: {},
  };
  const bindedAction = UpdatePasswordAction.bind(null, userInfo.fullname);
  const [formState, formAction] = useFormState(bindedAction, initialState);

  useEffect(() => {
    if (formState.success && formState.data) {
      toast.success(
        `Password updated successfully for "${formState.data.fullname}"`
      );

      //TODO see if useRouter refresh() can be used during API integration
      const timeoutId = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [formState.success, formState.data]);

  return (
    <div className="my-4 p-4 border-2 rounded-lg">
      <h3 className="text-lg font-semibold pb-2 border-b-2">Reset Password</h3>
      <form autoComplete="off" action={formAction}>
        <FormInputPassword
          id="password"
          name="password"
          label="Password"
          inputElementProps={{ autoComplete: 'off' }}
          errorMsg={formState.errors.password?.join(',')}
        ></FormInputPassword>

        <FormInputPassword
          id="confirmpassword"
          name="confirmpassword"
          label="Confirm Password"
          inputElementProps={{ autoComplete: 'off' }}
          errorMsg={formState.errors.confirmpassword?.join(',')}
        ></FormInputPassword>
        <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
          {formState.errors._form?.join(',')}
        </p>

        <div className="flex items-center justify-end gap-2">
          <FormSubmit>Reset</FormSubmit>
        </div>
      </form>
    </div>
  );
};

export default EditUserPasswordForm;
