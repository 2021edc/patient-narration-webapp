// Reusable form input element for passwords.

import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface FormInputPasswordProps {
  label: string;
  name: string;
  id: string;
  errorMsg?: string;
  inputElementProps: React.ComponentPropsWithRef<'input'>;
  onChange?: () => void;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
}

const FormInputPassword = ({
  label,
  id,
  name,
  errorMsg = '',
  inputElementProps,
  labelClassName = '',
  inputClassName = '',
  containerClassName = '',
  errorClassName = '',
  onChange = undefined,
}: FormInputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`w-full mb-1 ${containerClassName}`}>
      <div className="relative w-full">
        <label
          className={` text-light-gray mb-2 ${labelClassName}`}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className={`w-full p-2 border text-dark-gray border-light-gray rounded-lg ${inputClassName}`}
          name={name}
          id={id}
          {...inputElementProps}
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
        ></input>
        <button
          type="button"
          className="absolute right-2 top-1/2 mt-1 transform text-dark-gray"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeNoneIcon className="h-6 w-6" />
          ) : (
            <EyeOpenIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <p
        className={`mb-2 text-red-800 dark:text-red-500 text-xs min-h-2 ${errorClassName}`}
      >
        {errorMsg}
      </p>
    </div>
  );
};
export default FormInputPassword;
