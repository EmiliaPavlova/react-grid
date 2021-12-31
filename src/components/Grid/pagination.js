import { usePagination, DOTS } from './usePagination';
import './pagination.css';

export default function Pagination({totalCount, currentPage, pageSize, onPageChange}) {
  const paginationRange = usePagination({currentPage, totalCount, pageSize});

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className='pagination_wrapper'>
      <div className={`${currentPage === 1 ? 'disabled' : ''}`} onClick={onPrevious}>
        &laquo;
      </div>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <div key={pageNumber} className='dots'>&#8230;</div>;
        }
		
        return (
          <div
            key={index}
            className={`${pageNumber === currentPage ? 'selected' : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}
      <div className={`${currentPage === lastPage ? 'disabled' : ''}`} onClick={onNext}>
        &raquo;
      </div>
    </div>
  );
};
