import { NARRATION_TYPES_LIST } from '@/constants';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../ui/select';
import { memo } from 'react';

interface NarrationDropdownProps {
  setSelectedNarration: (narrationType: string) => void;
  className?: string;
}

const NarrationDropdown = ({
  setSelectedNarration,
}: NarrationDropdownProps) => {
  return (
    <Select
      onValueChange={(value) => setSelectedNarration(value)}
      name="narration_type"
    >
      <SelectTrigger className="!h-12 py-3 border-2">
        <SelectValue placeholder="Select Narration"></SelectValue>
      </SelectTrigger>

      <SelectContent className="bg-white">
        {NARRATION_TYPES_LIST.map((narration) => (
          <SelectItem
            className="py-4"
            value={narration.name}
            key={narration.name}
            disabled={narration.name === 'General'}
          >
            {narration.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default memo(NarrationDropdown);
