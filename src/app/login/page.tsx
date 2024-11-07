'use client';

import signinAction from '@/actions/auth/signin.action';
import FormSubmit from '@/atoms/FormSubmit';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { ISigninFormState } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CliniwiseLogo from '@/atoms/CliniwiseLogo';
import MerilLogo from '@/atoms/MerilLogo';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
          <div className="mb-4 mt-8 w-full">
            <label htmlFor="email" className="block text-light-gray mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border text-dark-gray border-light-gray rounded-lg"
            />
            <p className="my-2 text-red-800 dark:text-red-500 text-sm h-2">
              {formState.errors.email?.join(',')}
            </p>
          </div>
          <div className="mb-4 w-full">
            <div className="relative w-full">
              <label htmlFor="password" className="block text-light-gray mb-2">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full p-2 border border-light-gray text-dark-gray rounded-lg"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 mt-1 transform text-[#393E46]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeNoneIcon className="h-6 w-6" />
                ) : (
                  <EyeOpenIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            <p className="my-2 text-red-800 dark:text-red-500 text-sm h-2">
              {formState.errors.password?.join(',')}
            </p>
          </div>

          <p className="my-2 text-red-800 dark:text-red-500 text-sm h-2">
            {formState.errors._form?.join(',')}
          </p>

          <FormSubmit>Login</FormSubmit>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
