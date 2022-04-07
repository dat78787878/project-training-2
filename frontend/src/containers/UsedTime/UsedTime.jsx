import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import { getData } from '../../redux/usedTime/actions';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const UsedTime = () => {
  const { usedTimeData, isLoading, isError } = useSelector((state) => state.usedTime);
  const { fromDate, toDate } = useSelector((state) => state.dateRange);
  const listTitleString = ['OS Name', 'Date'];
  const listTitleNumber = ['Total', 'Fb', 'Yb', 'Other'];
  const [dataRender, setDataRender] = useState(usedTimeData);
  const [currentPage, setCurrentPage] = useState(1);
  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData([fromDate, toDate, currentPage]));
  }, [fromDate, toDate, currentPage]);

  useEffect(() => {
    usedTimeData.sort((a, b) => a.userName.localeCompare(b.userName));
    setDataRender(usedTimeData);
  }, [usedTimeData]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setCurrentPage(params.currentPage);
    dispatch(
      getData({
        fromDate: fromDate,
        toDate: toDate,
        currentPage: params.currentPage
      })
    );
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
    console.log(totalBlocks);
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, parseInt(currentPage) - pageNeighbours);
      const endPage = Math.min(totalPages - 1, parseInt(currentPage) + pageNeighbours);
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
    setCurrentPage(page);
  };

  const handleMoveLeft = (currentPage) => {
    setCurrentPage(currentPage - 1);
  };

  const handleMoveRight = (currentPage) => {
    setCurrentPage(currentPage + 1);
  };
  const pages = fetchPageNumbers();
  const pagination = (
    <div className="usedTime-container-pagination">
      {!currentPage ? setCurrentPage(1) : ''}
      <nav aria-label="Countries Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page == LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <Link
                    to={`?fromDate_=${fromDate}&toDate_=${toDate}&currentPage=${
                      parseInt(currentPage) - 1
                    }`}>
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

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <Link
                    to={`?fromDate_=${fromDate}&toDate_=${toDate}&currentPage=${
                      parseInt(currentPage) + 1
                    }`}>
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
              <li key={index} className={`page-item${currentPage == page ? ' active' : ''}`}>
                <Link to={`?fromDate_=${fromDate}&toDate_=${toDate}&currentPage=${page}`}>
                  <a
                    className="page-link"
                    data-testid={page}
                    href="#"
                    onClick={() => handleClick(page)}>
                    {page}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
  const tableUsedTime = (
    <div className="usedTime-container">
      <div className="usedTime-container-table">
        <Row>
          <Col xs={2}>
            UserName
            <FontAwesomeIcon icon={faArrowAltCircleUp} data-testid="arrow-circle-up" />
          </Col>
          {listTitleString.map((val, index) => {
            return (
              <Col xs={3} key={index + uuidv4()}>
                {val}
              </Col>
            );
          })}
          {listTitleNumber.map((val, index) => {
            return (
              <Col xs={1} key={index + uuidv4()}>
                {val}
              </Col>
            );
          })}
        </Row>
        <Row>
          {dataRender.map((val, index) => {
            return (
              <>
                <Col xs={2} key={index + uuidv4()}>
                  {val.userName}
                </Col>
                <Col xs={3} key={index + uuidv4()}>
                  {val.oSName}
                </Col>
                <Col xs={3} key={index + uuidv4()}>
                  {moment(val.date).format('YYYY-MM-DD')}
                </Col>
                <Col xs={1} key={index + uuidv4()}>
                  {val.useTimeNumber}
                </Col>
                <Col xs={1} key={index + uuidv4()}>
                  {val.facebookTimeUse}
                </Col>
                <Col xs={1} key={index + uuidv4()}>
                  {val.youtubeTimeUse}
                </Col>
                <Col xs={1} key={index + uuidv4()}>
                  {val.other}
                </Col>
              </>
            );
          })}
        </Row>
      </div>
      {pagination}
    </div>
  );

  return (
    <div className="usedTime padding-title">
      {isLoading && <Loading />}
      {isError && <Error />}
      {!isError && !isLoading && tableUsedTime}
    </div>
  );
};

export default UsedTime;
