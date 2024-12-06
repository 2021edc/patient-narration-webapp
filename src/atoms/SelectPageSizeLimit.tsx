'use client';

import ChangePagesizeAction from '@/actions/changepagesize.action';
// Reusable select menu option to choose the page size.

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter } from 'next/navigation';

interface SelectPageSizeLimitProps {
  pageSize: string;
  selectOptions: number[];
  cookie_key: string;
}

const SelectPageSizeLimit = ({
  cookie_key,
  pageSize,
  selectOptions,
}: SelectPageSizeLimitProps) => {
  const router = useRouter();
  const pathName = usePathname();

  // when the page size limit changes, the new size will be saved to a cookie and page reloaded with new data
  const handleChange = async (value: string) => {
    const limitChanged = await ChangePagesizeAction(
      cookie_key,
      value,
      pathName
    );
    if (limitChanged) {
      router.replace(`${pathName}?page=${1}`);
    }
  };

  return (
    <div className="flex items-center gap-4 w-60">
      <span className="whitespace-nowrap text-sm">Rows per page</span>

      <Select value={pageSize} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select page size">{pageSize}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPageSizeLimit;
