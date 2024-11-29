import React from 'react';
import MerilLogo from '@/atoms/MerilLogo';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] justify-center items-center">
      <div className="w-full h-full hidden lg:flex items-center justify-center flex-col">
        <MerilLogo imageSize="h-[150px] w-[150px] lg:h-[300px] lg:w-[300px]"></MerilLogo>
        <h1 className="text-4xl text-gray-500 dark:text-gray-200 font-bold text-center">
          Clinical Research and Medical Writing
        </h1>
      </div>
      <LoginForm></LoginForm>
    </div>
  );
};

export default LoginPage;
