import { useState, useMemo } from 'react';
import Pagination from './pagination';
import './grid.css';

const PageSize = 20;

export default function Grid({data, onMouseDown, onMouseUp, onMouseLeave}) {
  const [sort, setSort] = useState({col: undefined, order: 'default'});
  const [currentPage, setCurrentPage] = useState(1);

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sort]);

  const sortData = (col, order) => {
    if (order === 'default') return data;
    col && data.sort((a, b) => {
      return a.find(o => o.label === col).source === b.find(o => o.label === col).source
        ? 0
        : a.find(o => o.label === col).source > b.find(o => o.label === col).source
          ? order === 'asc'
            ? 1
            : -1
          : -1;
    })
  }

  const sortAsc = () => <span>&#x2B07;</span>;
  const sortDesc = () => <span>&#x2B06;</span>;

  const mapSorting = {
    default: <span />,
    asc: sortAsc(),
    desc: sortDesc(),
  }

  const onSort = (col) => {
    if (sort.col !== col) {
      sortData(col, 'asc');
      setSort({col: col, order: 'asc'});
    } else if (sort.order === 'asc') {
      sortData(col, 'desc');
      setSort({col: col, order: 'desc'});
    } else {
      sortData(col, 'asc');
      setSort({col: col, order: 'asc'})
    }
  }

  const header = data[0].map(prop => prop.label);

  const renderRows = (row, index) => {
    return (
      <tr
        key={index}
        onMouseDown={() => onMouseDown(row)}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}>
        {row.map((cell, key) => {
          return <td key={key} data-label={cell.label} className={`${cell.style ? cell.style : ''}`}>{cell.source}</td>
        })}
      </tr>
    )
  }

  return (
    <div className='grid_wrapper'>
      <table>
        <thead>
          <tr>
            {header.map((title, index) => {
              return (
                <th key={index} scope='col'>
                  <div className='table_title' onClick={() => onSort(title)}>
                    <span>{title}</span>
                    {sort.col === title && mapSorting[sort.order]}
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((rows, index) => renderRows(rows, index))}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  )
};