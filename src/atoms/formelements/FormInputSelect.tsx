import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';

interface FormInputSelectProps {
  label: string;
  name: string;
  id: string;
  optionsList: string[];
  defaultValue?: string;
  errorMsg?: string;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const FormInputSelect = ({
  label,
  id,
  name,
  optionsList,
  defaultValue = undefined,
  errorMsg = '',
  labelClassName = '',
  inputClassName = '',
  containerClassName = '',
  errorClassName = '',
  placeholder = 'Select an option',
  onChange = undefined,
}: FormInputSelectProps) => {
  return (
    <div className={`w-full mb-1 ${containerClassName}`}>
      <label className={` text-light-gray mb-2 ${labelClassName}`} htmlFor={id}>
        {label}
      </label>
      <Select name={name} defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger className="w-full !h-11 bg-white text-black">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          id={id}
          className={`bg-white text-black ${inputClassName}`}
        >
          <SelectGroup>
            {optionsList.map((option) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p
        className={`mb-2 text-red-800 dark:text-red-500 text-xs min-h-2 ${errorClassName}`}
      >
        {errorMsg}
      </p>
    </div>
  );
};

export default FormInputSelect;
