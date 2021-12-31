import { useMemo } from 'react';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const optionsCount = 1;
    const displayedPageNumbers = optionsCount + 5;

    if (displayedPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
	
    const leftOptionsIndex = Math.max(currentPage - optionsCount, 1);
    const rightOptionsIndex = Math.min(currentPage + optionsCount, totalPageCount);
    const shouldShowLeftDots = leftOptionsIndex > 2;
    const shouldShowRightDots = rightOptionsIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * optionsCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * optionsCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftOptionsIndex, rightOptionsIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, currentPage]);

  return paginationRange;
};