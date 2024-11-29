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
import { usePathname } from 'next/navigation';

export interface PaginateProps {
  searchParams: { page?: string; limit?: string } | undefined;
  totalCount: number;
  pageSize: number;
  page: number;
}

const Paginate = ({
  searchParams,
  pageSize,
  totalCount,
  page,
}: PaginateProps) => {
  const pathName = usePathname();

  // Calculating the no of pages from items per page and total items
  const totalPageCount = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 1;

  // Generating page links using search params object.
  const buildLink = (newPage: number) => {
    const pagekey = 'page';
    const limitkey = 'limit';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(pagekey, String(newPage));
    newSearchParams.set(limitkey, String(pageSize));
    return `${pathName}?${newSearchParams.toString()}`;
  };

  // Function that will create the page links in the pagination. max visible page links is 5.
  // More than 5 pages will be dispalyed with ellipsis
  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={buildLink(1)} isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            href={buildLink(totalPageCount)}
            isActive={page === totalPageCount}
          >
            {totalPageCount}
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
              aria-disabled={page === 1}
              className={`px-4 flex gap-2 items-center w-max ${page === 1 ? 'pointer-events-none opacity-50' : undefined}`}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" />
              <span>First</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={
                page === 1 ? 'pointer-events-none opacity-50' : undefined
              }
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={
                page === totalPageCount
                  ? 'pointer-events-none opacity-50'
                  : undefined
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={buildLink(totalPageCount)}
              aria-disabled={page === totalPageCount}
              className={`px-4 flex gap-2 items-center w-max ${page === totalPageCount ? 'pointer-events-none opacity-50' : undefined}`}
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
