// Reusable form input element

interface FormInputProps {
  label: string;
  name: string;
  id: string;
  errorMsg?: string;
  inputElementProps: React.ComponentPropsWithRef<'input'>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
}

const FormInput = ({
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
}: FormInputProps) => {
  return (
    <div className={`w-full mb-1 ${containerClassName}`}>
      <label className={` text-light-gray mb-2 ${labelClassName}`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`w-full p-2 border text-dark-gray border-light-gray rounded-lg ${inputClassName}`}
        name={name}
        id={id}
        {...inputElementProps}
        onChange={onChange}
      ></input>
      <p
        className={`mb-2 text-red-800 dark:text-red-500 text-xs min-h-2 ${errorClassName}`}
      >
        {errorMsg}
      </p>
    </div>
  );
};
export default FormInput;
