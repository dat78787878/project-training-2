import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../redux/pieChart/actions';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { difference } from 'lodash';
const ModalShow = () => {
  const pieData = useSelector((state) => state.pieChart.pieData);
  const { fromDate, toDate } = useSelector((state) => state.dateRange);
  const listAllData = ['Android', 'Windows', 'iOS', 'OsX', 'Unknown', 'Linux'];
  const [listDataModal, setListDataModal] = useState(listAllData);
  const [listDataCheck, setListDataCheck] = useState(pieData.map((val) => val.x));
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const onClickLabel = (val) => {
    setListDataCheck((prevList) => {
      const isChecked = prevList.includes(val);
      if (isChecked) {
        return prevList.filter((check) => check !== val);
      }
      return [...prevList, val];
    });
  };

  const onHide = () => {
    const prevListDataCheck = pieData.map((val) => val.x);
    difference(listDataCheck, prevListDataCheck)
      ? dispatch(getData([fromDate, toDate, listDataCheck]))
      : '';
    setShow(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyFilter = e.target.value.trim().toLowerCase();
    if (keyFilter.length > 0) {
      setListDataModal((prev) => {
        return prev.filter((val) => val.toLowerCase().includes(keyFilter));
      });
    } else {
      setListDataModal(listAllData);
    }
  };

  return (
    <div className="modalShow">
      <Button variant="success" className="m-1" onClick={() => setShow(true)}>
        Show modal
      </Button>

      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="modal-custom"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Body>
          <input className="modal-custom-input" onChange={handleSearch} />
          {listDataModal.map((val, index) => {
            return (
              <div
                key={index}
                className="d-flex justify-content-between p-2"
                onClick={() => onClickLabel(val)}>
                <span>{val}</span>
                {listDataCheck.includes(val) && <FontAwesomeIcon icon={faCheck} />}
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalShow;
