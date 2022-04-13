import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const Filter = ({ setDataRender, usedTimeData }) => {
  const listOS = ['Android', 'iOS'];
  const [type, setType] = useState('Please select');
  const [dateSearch, setDateSearch] = useState('YYYY-MM-DD');
  const handleSearch = (e) => {
    e.preventDefault();
    const keyFilter = e.target.value.trim().toLowerCase();
    if (keyFilter.length > 0) {
      setDataRender((prev) => {
        return prev.filter((val) => val.userName.toLowerCase().includes(keyFilter));
      });
    } else {
      setDataRender(usedTimeData);
    }
  };

  const handleSelect = (e) => {
    setDataRender(usedTimeData);
    setDataRender((prev) => {
      return prev.filter((val) => val.oSName.includes(e.target.value));
    });
    setType(e.target.value);
    if (e.target.value === 'Please select') {
      setDataRender(usedTimeData);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e);
    setDateSearch(e.target.value);
    setDataRender((prev) => {
      return prev.filter((val) => moment(val.date).format('YYYY-MM-DD').includes(e.target.value));
    });
    if (e.target.value === '') {
      setDataRender(usedTimeData);
    }
  };

  return (
    <div className="filter">
      <Row>
        <Col>
          <input
            data-testid="input-name-used"
            className="filter-input"
            onChange={handleSearch}
            placeholder="Search"
          />
        </Col>
        <Col>
          <div className="d-flex">
            <label>Select Date:</label>
            <input
              data-testid="input-date-used"
              type="date"
              name="trip-start"
              value={dateSearch}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col>
          <Form.Select
            aria-label="Default select example"
            data-testid="select-box-used"
            onChange={handleSelect}
            value={type}>
            <option>Please select</option>
            {listOS.map((val, index) => {
              return (
                <option key={index + uuidv4()} value={val}>
                  {val}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
