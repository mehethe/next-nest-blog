'use client';

import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useSearchObject from '@/hooks/use-search-object';
import { cn } from '@/lib/utils';

import { MouseEvent, useCallback, useMemo } from 'react';

type PaginationProps = {
  pages: number;
};

export default function Pagination({ pages }: PaginationProps) {
  const {
    searchObject: { page, ...rest },
    setSearchParams,
  } = useSearchObject();

  const activePage = Number(page) || 1;

  const handlePageChange = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, targetPage: number) => {
      e.preventDefault();
      if (targetPage < 1 || activePage === targetPage || targetPage > pages) {
        return;
      }

      setSearchParams({ ...rest, page: String(targetPage) });
    },
    [activePage, pages, rest, setSearchParams]
  );

  const pageButtons = useMemo(() => {
    return (
      pages > 1 &&
      [...Array(pages)].map((_, i) => {
        const buttonPage = i + 1;

        if (activePage + 2 < buttonPage || activePage - 2 > buttonPage) {
          return null;
        }

        return (
          <PaginationItem key={buttonPage}>
            <PaginationLink
              href='#'
              onClick={(e) => handlePageChange(e, buttonPage)}
              isActive={activePage === buttonPage}
            >
              {buttonPage}
            </PaginationLink>
          </PaginationItem>
        );
      })
    );
  }, [activePage, pages, handlePageChange]);

  if (!pages || pages < 2) return null;

  return (
    <ShadPagination className='mt-4 mb-6'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            className={cn(
              'hidden sm:flex',
              activePage === 1 && 'cursor-not-allowed'
            )}
            onClick={(e) => handlePageChange(e, activePage - 1)}
          />
        </PaginationItem>
        {3 < activePage && ( //first page + 2 extra page
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageButtons}
        {activePage + 2 < pages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href='#'
            className={cn(
              'hidden sm:flex',
              activePage === pages && 'cursor-not-allowed'
            )}
            onClick={(e) => handlePageChange(e, activePage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadPagination>
  );
}
