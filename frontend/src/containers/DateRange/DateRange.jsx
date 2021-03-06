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
import { Col, Row } from 'react-bootstrap';

const DateRange = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [start, setStart] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [end, setEnd] = useState(moment(new Date()).format('YYYY-MM-DD'));
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
    params.fromDate_ ? '' : (params.fromDate_ = moment(new Date()).format('YYYY-MM-DD'));
    params.toDate_ ? '' : (params.toDate_ = moment(new Date()).format('YYYY-MM-DD'));
    setStartDate(moment(params.fromDate_));
    setEndDate(moment(params.toDate_));
    dispatch(
      getData({
        fromDate: start,
        toDate: end
      })
    );
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
    <div className="dateRange d-flex p-2">
      <Row>
        <Col md={2} sm={12}>
          <div className="dateRange-title">Range</div>
        </Col>
        <Col md={8} sm={12}>
          <DateRangePicker
            startDate={startDate}
            startDateId="start-date"
            endDate={endDate}
            endDateId="end-date"
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          />
        </Col>
        <Col md={2} sm={12}>
          <Link to={`?fromDate_=${start}&toDate_=${end}`}>
            <Button variant="success" onClick={handleClick} className="m-1">
              OKE
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default DateRange;
