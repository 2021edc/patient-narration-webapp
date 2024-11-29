import {
  CaretDownIcon,
  CaretUpIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '../ui/badge';
import useClickOutside from '@/hooks/useClickOutside';
import { Button } from '../ui/button';

interface MultiSelectDropdownProps {
  optionsList: string[];
  selectedOptions: string[];
  onSelect: (id: string) => void;
  onUnselect: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  selectAllLimit: number;
  columnName: string;
  className?: string;
  disabled?: boolean;
}

// reusable multi select drop down

const MultiSelectDropdown = ({
  optionsList,
  selectedOptions,
  onSelect,
  onUnselect,
  onSelectAll,
  className = 'w-1/3',
  columnName,
  disabled = false,
  selectAllLimit,
}: MultiSelectDropdownProps) => {
  const [menuOptions, setMenuOptions] = useState<string[]>([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setMenuOptions(optionsList);
  }, [optionsList]);

  // Update filter and update options list when search string is entered, else restore options list
  useEffect(() => {
    if (searchString.length > 0) {
      const filteredOptions = optionsList.filter((item) =>
        item.toLowerCase().includes(searchString.toLowerCase())
      );
      setMenuOptions(filteredOptions);
    } else {
      setMenuOptions(optionsList);
    }
  }, [searchString, optionsList]);

  const [showDropdown, setShowDropdown] = useState(false);
  const DropDownIcon = showDropdown ? CaretUpIcon : CaretDownIcon;

  // To close the dropdown when clicked outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setShowDropdown(false));

  // Check box handling when an item is selected or unselected.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedItem = e.target.value;
    if (e.target.checked) onSelect(changedItem);
    else onUnselect(changedItem);
  };

  return (
    <div className={`${className}`}>
      <div className="relative mb-4" ref={dropdownRef}>
        {/* Trigger button that opens and closed the dropdown */}

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
          <div
            className="absolute z-10 bg-white border dark:text-black border-gray-300 rounded-lg shadow-lg mt-1 w-full"
            aria-label="submenu"
            role="menu"
            aria-labelledby="custom-dropdown"
          >
            <div role="dropdownitem" className="px-2">
              {/* Select all and reset buttons */}

              <div className="flex gap-2 my-2">
                <Button
                  disabled={selectedOptions.length === selectAllLimit}
                  onClick={() => onSelectAll(true)}
                  className="min-w-28"
                >
                  Select All
                </Button>
                <Button
                  disabled={selectedOptions.length === 0}
                  onClick={() => onSelectAll(false)}
                  className="min-w-28"
                >
                  Reset
                </Button>
              </div>

              {/* Search field. Reset button shown when search string not empty */}

              <div className="relative my-2 border-2 rounded-lg text-dark-gray border-light-gray">
                <input
                  type="text"
                  className="w-full p-2 rounded-sm"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  placeholder="Search"
                ></input>
                {searchString.length > 0 && (
                  <button
                    className="absolute right-2 top-1/4"
                    onClick={() => {
                      setSearchString('');
                      setMenuOptions(optionsList);
                    }}
                  >
                    <CrossCircledIcon className="h-5 w-5"></CrossCircledIcon>
                  </button>
                )}
              </div>
            </div>

            {/* Message displayed when no search result is available */}

            <ul role="dropdownitem" className="max-h-80 overflow-y-auto">
              {searchString.length > 0 && menuOptions.length === 0 && (
                <li className="py-4 text-gray-600">
                  <p>No results</p>
                </li>
              )}

              {/* Select menu options, full list displayed when no search string is added  */}
              {menuOptions.map((option) => (
                <li role="dropdownitem" key={option}>
                  <label
                    className="flex items-center text-left px-4 py-2 hover:bg-gray-100"
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
