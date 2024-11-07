import { useRef, useState } from 'react';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import useClickOutside from '@/hooks/useClickOutside';
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { NARRATION_TYPES_LIST } from '@/constants';

interface NarrationDropdownProps {
  selectedNarration: string | undefined;
  setSelectedNarration: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  disabled: boolean;
  className?: string;
}

const NarrationDropdown = ({
  selectedNarration,
  setSelectedNarration,
  disabled,
  className = 'w-1/3',
}: NarrationDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const DropDownIcon = showDropdown ? CaretUpIcon : CaretDownIcon;

  // To close the dropdown when clicked outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setShowDropdown(false));

  return (
    <div className={`${className}`}>
      <div className="relative mb-4" role="dropdown" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="border border-gray-300 p-2 rounded-lg w-full flex justify-between items-center disabled:opacity-40 disabled:cursor-not-allowed"
          aria-haspopup="true"
          disabled={disabled}
        >
          <p>{selectedNarration ? selectedNarration : 'Select Narration'}</p>
          <DropDownIcon className="h-4 w-4"></DropDownIcon>
        </button>
        {showDropdown && (
          <ul
            className="absolute z-10 bg-white border dark:text-black border-gray-300 rounded-lg shadow-lg mt-1 w-full max-h-80 overflow-y-auto flex flex-col"
            aria-label="submenu"
            role="menu"
            aria-labelledby="custom-dropdown"
          >
            {NARRATION_TYPES_LIST.map((narration) => (
              <li role="dropdownitem" key={narration.name}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <label className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <input
                          type="checkbox"
                          value={narration.name}
                          checked={selectedNarration === narration.name}
                          onChange={() => {
                            setSelectedNarration(narration.name);
                          }}
                          className="mr-2"
                        />
                        {narration.name}
                      </label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-base">{narration.coverage}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Display selected narration */}
      {selectedNarration && (
        <div className="mt-2 text-left">
          Selected Narration: {selectedNarration}
        </div>
      )}
    </div>
  );
};

export default NarrationDropdown;
