'use client';

import { type ReactNode } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { usePathname, useSearchParams } from 'next/navigation';

export interface PaginateProps {
  totalPages: number;
}

const Paginate = ({ totalPages }: PaginateProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');

  // Generating page links using search params object.
  const buildLink = (newPage: number) => {
    const pagekey = 'page';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(pagekey, String(newPage));
    return `${pathName}?${newSearchParams.toString()}`;
  };

  // Function that will create the page links in the pagination. max visible page links is 5.
  // More than 5 pages will be dispalyed with ellipsis
  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={buildLink(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href={buildLink(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-">
      <Pagination>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationLink
              href={buildLink(1)}
              aria-disabled={currentPage === 1}
              className={`px-4 flex gap-2 items-center w-max ${currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}`}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" />
              <span>First</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(currentPage - 1, 1))}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : undefined
              }
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(currentPage + 1, totalPages))}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : undefined}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : undefined
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={buildLink(totalPages)}
              aria-disabled={currentPage === totalPages}
              className={`px-4 flex gap-2 items-center w-max ${currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}`}
            >
              <span>Last</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginate;
