import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '../ui/badge';
import useClickOutside from '@/hooks/useClickOutside';

interface MultiSelectDropdownProps {
  options: string[];
  selectedOptions: string[];
  onSelect: (id: string) => void;
  onUnselect: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  columnName: string;
  className?: string;
  disabled?: boolean;
}

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  onSelect,
  onUnselect,
  onSelectAll,
  className = 'w-1/3',
  columnName,
  disabled = false,
}: MultiSelectDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const DropDownIcon = showDropdown ? CaretUpIcon : CaretDownIcon;

  // To close the dropdown when clicked outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setShowDropdown(false));

  useEffect(() => {
    if (options.length !== selectedOptions.length) {
      setAllSelected(false);
    } else {
      setAllSelected(true);
    }
  }, [options, selectedOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedItem = e.target.value;
    if (e.target.checked) onSelect(changedItem);
    else onUnselect(changedItem);
  };

  const handleSelectedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAll = e.target.checked;
    onSelectAll(selectedAll);
  };

  return (
    <div className={`${className}`}>
      <div className="relative mb-4" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          disabled={disabled}
          className="border border-gray-300 p-2 rounded-lg w-full flex justify-between items-center disabled:opacity-40 disabled:cursor-not-allowed"
          aria-haspopup="true"
        >
          {selectedOptions.length > 0 ? (
            <div className="flex gap-4 w-11/12 justify-between">
              <p>{`Selected ${columnName}`}</p>
              <Badge>{selectedOptions.length}</Badge>
            </div>
          ) : (
            <p>{`Select ${columnName}`}</p>
          )}

          <DropDownIcon className="h-4 w-4"></DropDownIcon>
        </button>
        {showDropdown && (
          <div>
            <ul
              className="absolute z-10 bg-white border dark:text-black border-gray-300 rounded-lg shadow-lg mt-1 w-full max-h-80 overflow-y-auto"
              aria-label="submenu"
              role="menu"
              aria-labelledby="custom-dropdown"
            >
              {options.length > 0 && (
                <li role="dropdownitem">
                  <label className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <input
                      id="selectall"
                      type="checkbox"
                      value={'Select All'}
                      checked={allSelected}
                      onChange={handleSelectedAll}
                      className="mr-2"
                    />
                    Select All
                  </label>
                </li>
              )}
              {options.map((option) => (
                <li role="dropdownitem" key={option}>
                  <label
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    htmlFor={option}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      id={option}
                      checked={selectedOptions.includes(option)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Display selected narration */}
      {selectedOptions.length > 0 && (
        <div className="mt-2 text-left">{selectedOptions.join(', ')}</div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
