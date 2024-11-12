'use client';

import signinAction from '@/actions/auth/signin.action';
import FormSubmit from '@/atoms/formelements/FormSubmit';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { ISigninFormState } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CliniwiseLogo from '@/atoms/CliniwiseLogo';
import MerilLogo from '@/atoms/MerilLogo';
import FormInput from '@/atoms/formelements/FormInput';
import FormInputPassword from '@/atoms/formelements/FormInputPassword';

const LoginPage = () => {
  const router = useRouter();
  const initialState: ISigninFormState = {
    success: false,
    errors: { _form: [] },
  };
  const [formState, formAction] = useFormState(signinAction, initialState);

  useEffect(() => {
    if (formState.success) {
      router.replace('/');
      toast.success('Sign-in successful');
    }
  }, [formState.success, router]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] justify-center items-center">
      <div className="w-full h-full hidden lg:flex items-center justify-center flex-col">
        <h1 className="text-4xl text-gray-500 dark:text-gray-200 font-bold text-center">
          Clinical Research and Medical Writing
        </h1>
        <div className="flex gap-8 my-12">
          <CliniwiseLogo imageSize="h-[150px] w-[150px] lg:h-[200px] lg:w-[200px]"></CliniwiseLogo>
          <MerilLogo imageSize="h-[150px] w-[150px] lg:h-[200px] lg:w-[200px]"></MerilLogo>
        </div>
      </div>
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
              inputElementProps={{ type: 'email', autoComplete: 'off' }}
              errorMsg={formState.errors.email?.join(',')}
            ></FormInput>
            <FormInputPassword
              id="password"
              name="password"
              label="Password"
              inputElementProps={{ autoComplete: 'off' }}
              errorMsg={formState.errors.password?.join(',')}
            ></FormInputPassword>

            <p className="my-2 text-red-800 dark:text-red-500 text-sm h-2">
              {formState.errors._form?.join(',')}
            </p>
            <FormSubmit>Login</FormSubmit>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
