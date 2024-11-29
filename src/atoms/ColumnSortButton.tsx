'use client';

// Reusable sort button, to be used in tables, will render arraws based on column sorting status
import { Button } from '@/components/ui/button';
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons';
import { SortDirection } from '@tanstack/react-table';

interface ColumnSortButtonProps {
  title: string;
  onClick: () => void;
  isSorting: boolean | SortDirection;
}

const ColumnSortButton = ({
  onClick,
  title,
  isSorting,
}: ColumnSortButtonProps) => {
  return (
    <div className="flex items-center justify-center">
      <Button
        variant={'ghost'}
        onClick={() => onClick()}
        className="flex gap-2 items-center"
      >
        {title}
        {!isSorting && <CaretSortIcon className="h-5 w-5"></CaretSortIcon>}
        {isSorting === 'asc' && <CaretUpIcon className="h-5 w-5"></CaretUpIcon>}
        {isSorting === 'desc' && (
          <CaretDownIcon className="h-5 w-5"></CaretDownIcon>
        )}
      </Button>
    </div>
  );
};

export default ColumnSortButton;
