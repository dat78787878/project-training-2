import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import { getData } from '../../redux/usedTime/actions';
import Loading from '../../components/Loading/Loading';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';

const UsedTime = () => {
  const { usedTimeData, isLoading, isError } = useSelector((state) => state.usedTime);
  const listTitleString = ['OS Name', 'Date'];
  const listTitleNumber = ['Total', 'Facebook', 'Youtube', 'Other'];
  const [dataRender, setDataRender] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData([page, sort]));
  }, [page, sort]);

  useEffect(() => {
    if (sort == '' || !sort) {
      setDataRender(usedTimeData);
    } else {
      const dataSortTemp = usedTimeData;
      const dataSort = dataSortTemp.sort((a, b) => a.userName.localeCompare(b.userName));
      setDataRender(dataSort);
    }
  }, [usedTimeData, sort]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    params.page ? '' : (params.page = 1);
    params.sort ? '' : (params.sort = '');
    setPage(params.page);
    setSort(params.sort);
    dispatch(getData([params.page, params.sort]));
  }, [window.location.search]);

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
  const handleSort = useCallback(
    (s) => {
      if (s === 'asc') {
        setSort('');
        setDataRender(usedTimeData);
      } else {
        setSort('asc');
        const dataSortTemp = usedTimeData;
        const dataSort = dataSortTemp.sort((a, b) => a.userName.localeCompare(b.userName));
        setDataRender(dataSort);
      }
    },
    [usedTimeData]
  );

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
  const tableUsedTimeHeader = (
    <thead>
      <tr>
        <th>
          UserName
          <FontAwesomeIcon
            icon={faArrowUp}
            data-testid="arrow-circle-up"
            onClick={() => handleSort(sort)}
          />
        </th>
        {listTitleString.map((val, index) => {
          return <th key={index + uuidv4()}>{val}</th>;
        })}
        {listTitleNumber.map((val, index) => {
          return <th key={index + uuidv4()}>{val}</th>;
        })}
      </tr>
    </thead>
  );
  const tableUsedTime = (
    <>
      <tbody>
        {isError ? (
          <tr>
            <td colSpan={7}>no data</td>
          </tr>
        ) : (
          dataRender.map((val, index) => {
            return (
              <tr key={index + uuidv4()}>
                <td key={index + uuidv4()}>{val.userName}</td>
                <td key={index + uuidv4()}>{val.oSName}</td>
                <td key={index + uuidv4()}>{moment(val.date).format('YYYY-MM-DD')}</td>
                <td key={index + uuidv4()}>{val.useTimeNumber}</td>
                <td key={index + uuidv4()}>{val.facebookTimeUse}</td>
                <td key={index + uuidv4()}>{val.youtubeTimeUse}</td>
                <td key={index + uuidv4()}>{val.other}</td>
              </tr>
            );
          })
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7}>{pagination}</td>
        </tr>
      </tfoot>
    </>
  );

  return (
    <div className="usedTime">
      <Menu />
      <div className="usedTime-container padding-title">
        <Table striped bordered hover>
          {tableUsedTimeHeader}
          {!isLoading ? tableUsedTime : <Loading />}
        </Table>
      </div>
    </div>
  );
};

export default UsedTime;
