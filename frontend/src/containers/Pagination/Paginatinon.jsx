import React from 'react';
import { Link } from 'react-router-dom';

const Paginatinon = ({ page, setPage, sort }) => {
  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';
  console.log('page', page);
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  const fetchPageNumbers = () => {
    const totalPages = 10;
    const pageNeighbours = 1;
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, parseInt(page) - pageNeighbours);
      const endPage = Math.min(totalPages - 1, parseInt(page) + pageNeighbours);
      const current = totalPages - endPage;
      let pages = range(startPage, endPage);
      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = current > 1;
      const spillOffset = totalNumbers - (pages.length + 1);
      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };
  const handleClick = (page) => {
    setPage(page);
  };

  const handleMoveLeft = (page) => {
    setPage(page - 1);
  };

  const handleMoveRight = (page) => {
    setPage(page + 1);
  };
  const pages = fetchPageNumbers();
  const pagination = (
    <div className="usedTime-container-pagination">
      {!page ? setPage(1) : ''}
      <nav aria-label="Countries Pagination">
        <ul className="pagination">
          {pages.map((item, index) => {
            if (item == LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <Link to={`/used_time?page=${parseInt(page) - 1}&sort=${sort}`}>
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={handleMoveLeft}>
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </Link>
                </li>
              );

            if (item === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <Link to={`/used_time?page=${parseInt(page) + 1}&sort=${sort}`}>
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      aria-expanded="false"
                      onClick={handleMoveRight}>
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </Link>
                </li>
              );

            return (
              <li key={index} className={`page-item${page == item ? ' active' : ''}`}>
                <Link to={`/used_time?page=${item}&sort=${sort}`}>
                  <a
                    className="page-link"
                    data-testid={item}
                    href="#"
                    onClick={() => handleClick(item)}>
                    {item}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
  return <>{pagination}</>;
};

export default Paginatinon;
