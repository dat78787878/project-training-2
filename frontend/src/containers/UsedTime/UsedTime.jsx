import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import { getData } from '../../redux/usedTime/actions';
import Loading from '../../components/Loading/Loading';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Menu from '../Menu/Menu';
import Paginatinon from '../Pagination/Paginatinon';

const UsedTime = () => {
  const { usedTimeData, isLoading, isError } = useSelector((state) => state.usedTime);
  const listTitleString = ['OS Name', 'Date'];
  const listTitleNumber = ['Total', 'Facebook', 'Youtube', 'Other'];
  const [dataRender, setDataRender] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData([page, sort]));
  }, [page, sort]);

  useEffect(() => {
    if (sort == '' || !sort) {
      setDataRender(usedTimeData);
    } else if (sort == 'asc') {
      const dataSortTemp = usedTimeData;
      const dataSort = dataSortTemp.sort((a, b) => a.userName.localeCompare(b.userName));
      setDataRender(dataSort);
    } else {
      const dataSortTemp = usedTimeData;
      const dataSort = dataSortTemp.sort((a, b) => b.userName.localeCompare(a.userName));
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

  const handleSort = useCallback(
    (s) => {
      if (s === 'asc') {
        setSort('desc');
        const dataSortTemp = usedTimeData;
        const dataSort = dataSortTemp.sort((a, b) => b.userName.localeCompare(a.userName));
        setDataRender(dataSort);
      } else {
        setSort('asc');
        const dataSortTemp = usedTimeData;
        const dataSort = dataSortTemp.sort((a, b) => a.userName.localeCompare(b.userName));
        setDataRender(dataSort);
      }
    },
    [usedTimeData]
  );

  const tableUsedTimeHeader = (
    <thead>
      <tr>
        <th>
          UserName
          {console.log('sort', sort)}
          {sort == 'desc' ? (
            <FontAwesomeIcon
              icon={faArrowDown}
              data-testid="arrow-circle-down"
              onClick={() => handleSort(sort)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faArrowUp}
              data-testid="arrow-circle-up"
              onClick={() => handleSort(sort)}
            />
          )}
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
        {isLoading ? (
          <tr>
            <td colSpan={7}>
              <Loading />
            </td>
          </tr>
        ) : isError ? (
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
          <td colSpan={7}>
            <Paginatinon page={page} setPage={setPage} sort={sort} />
          </td>
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
          {tableUsedTime}
        </Table>
      </div>
    </div>
  );
};

export default UsedTime;
