import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getData } from '../../redux/dateRange/actions';
import moment from 'moment';

const DateRange = () => {
  const dispatch = useDispatch();
  const { fromDate, toDate } = useSelector((state) => state.dateRange);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleClick = () => {
    if (startDate !== null && endDate !== null) {
      console.log(startDate, endDate);
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
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
      ;
      <Button variant="primary" onClick={handleClick}>
        OK
      </Button>
    </div>
  );
};

export default DateRange;
