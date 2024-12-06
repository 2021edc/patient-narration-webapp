'use client';

import signinAction from '@/actions/auth/signin.action';
import FormInput from '@/atoms/formelements/FormInput';
import FormInputPassword from '@/atoms/formelements/FormInputPassword';
import FormSubmit from '@/atoms/formelements/FormSubmit';
import { ISigninFormState } from '@/types';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useFormState } from 'react-dom';
import SessionTransferAction from '@/actions/auth/sessiontransfer.action';

const LoginForm = () => {
  const initialState: ISigninFormState = {
    success: false,
    errors: { _form: [] },
  };
  const [formState, formAction] = useFormState(signinAction, initialState);
  const [showTransferAlert, setShowTransferAlert] = useState<boolean>(false);

  // function to handle sesstion transfer. calls new action to transfer session.
  const handleSessionTransfer = async () => {
    if (formState.data) {
      await SessionTransferAction(formState.data);
    }
  };

  // show session transfer alert popup to get user confirmation
  useEffect(() => {
    if (formState.isActiveSession) {
      setShowTransferAlert(true);
    }
  }, [formState.isActiveSession]);

  return (
    <section className="w-full h-full flex items-center justify-center">
      <form
        className="flex flex-col items-center bg-light-bg dark:bg-dark-bg text-dark-text dark:text-light-text p-8 rounded-lg shadow-md w-11/12 md:w-4/5 max-w-[450px] min-h-[500px]"
        action={formAction}
      >
        <h2 className="text-2xl w-max flex items-center justify-center font-bold pb-4 mb-4 border-b-2 border-dark-gray dark:border-light-text">
          Login
        </h2>
        <div className="flex flex-col items-center my-10">
          <FormInput
            id="email"
            name="email"
            label="Email"
            inputElementProps={{ type: 'email' }}
            errorMsg={formState.errors?.email?.join(',')}
          ></FormInput>
          <FormInputPassword
            id="password"
            name="password"
            label="Password"
            inputElementProps={{}}
            errorMsg={formState.errors?.password?.join(',')}
          ></FormInputPassword>

          <p className="mb-6 text-red-800 dark:text-red-500 text-sm">
            {formState.errors?._form?.join(',')}
          </p>
          <FormSubmit>Login</FormSubmit>
        </div>
      </form>
      <AlertDialog open={showTransferAlert} onOpenChange={setShowTransferAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Active Session Detected</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;re already logged in on another device/browser. Do you
              want to transfer your session here?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => window.location.reload()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSessionTransfer}>
              Transfer Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default LoginForm;
