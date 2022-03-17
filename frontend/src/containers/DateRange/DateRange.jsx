import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getData } from '../../redux/dateRange/actions';
import moment from 'moment';
import { Link } from 'react-router-dom';

const DateRange = () => {
  const dispatch = useDispatch();
  const { fromDate, toDate } = useSelector((state) => state.dateRange);
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
  });

  const handleClick = () => {
    if (!!startDate && !!endDate) {
      const start = moment(startDate).format('DD/MM/YYYY');
      const end = moment(endDate).format('DD/MM/YYYY');
      if (start !== fromDate || end !== toDate) {
        dispatch(
          getData({
            fromDate: start,
            toDate: end
          })
        );
      }
    }
  };

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
        <Button variant="primary" onClick={handleClick}>
          OK
        </Button>
      </Link>
    </div>
  );
};

export default DateRange;
