import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { getData } from '../../redux/dateRange/actions';
import moment from 'moment';
import { Link } from 'react-router-dom';

const DateRange = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setStartDate(moment(params.fromDate_));
    setEndDate(moment(params.toDate_));
  }, [window.location.search]);

  const handleClick = useCallback(() => {
    const start = moment(startDate).format('DD/MM/YYYY');
    const end = moment(endDate).format('DD/MM/YYYY');
    dispatch(
      getData({
        fromDate: start,
        toDate: end
      })
    );
  }, [startDate, endDate]);

  return (
    <div className="dateRange d-flex">
      <div className="dateRange-title">Range</div>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
      <Link to={`?fromDate_=${startDate}&toDate_=${endDate}`}>
        <Button variant="success" onClick={handleClick} className="m-1">
          Ấn vào đây đi chị Mike
        </Button>
      </Link>
    </div>
  );
};

export default DateRange;
