import { useRef, useState } from 'react';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import useClickOutside from '@/hooks/useClickOutside';

interface NarrationDropdownProps {
  narrations: string[];
  selectedNarration: string | undefined;
  setSelectedNarration: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  className?: string;
}

const NarrationDropdown = ({
  narrations,
  selectedNarration,
  setSelectedNarration,
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
          className="border border-gray-300 p-2 rounded-lg w-full flex justify-between items-center"
          aria-haspopup="true"
        >
          <p>{selectedNarration ? selectedNarration : 'Select Narration'}</p>
          <DropDownIcon className="h-4 w-4"></DropDownIcon>
        </button>
        {showDropdown && (
          <ul
            className="absolute z-10 bg-white border dark:text-black border-gray-300 rounded-lg shadow-lg mt-1 w-full max-h-80 overflow-y-auto"
            aria-label="submenu"
            role="menu"
            aria-labelledby="custom-dropdown"
          >
            {narrations.map((narration) => (
              <li role="dropdownitem" key={narration}>
                <label className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    value={narration}
                    checked={selectedNarration === narration}
                    onChange={() => {
                      setSelectedNarration(narration);
                    }}
                    className="mr-2"
                  />
                  {narration}
                </label>
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
