import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const Filter = ({
  setDataRender,
  usedTimeData,
  search,
  date,
  type,
  setSearch,
  setDate,
  setType
}) => {
  const listOS = ['Android', 'iOS'];

  const handleSearch = (e) => {
    e.preventDefault();
    const keyFilter = e.target.value.trim().toLowerCase();
    setSearch(keyFilter);
  };

  const handleSelect = (e) => {
    setDataRender(usedTimeData);
    setType(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDate(e.target.value);
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
            value={search}
          />
        </Col>
        <Col>
          <div className="d-flex input-date">
            <input
              data-testid="input-date-used"
              type="date"
              name="trip-start"
              value={date}
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
