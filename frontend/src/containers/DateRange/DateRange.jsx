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
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setStart(moment(startDate).format('YYYY-MM-DD'));
    setEnd(moment(endDate).format('YYYY-MM-DD'));
  };
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setStartDate(moment(params.fromDate_));
    setEndDate(moment(params.toDate_));
  }, [window.location.search]);

  const handleClick = useCallback(() => {
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
        startDateId="start-date"
        endDate={endDate}
        endDateId="end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
      <Link to={`?fromDate_=${start}&toDate_=${end}`}>
        <Button variant="success" onClick={handleClick} className="m-1">
          OKE
        </Button>
      </Link>
    </div>
  );
};

export default DateRange;
