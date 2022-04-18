import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postData, putData } from '../../redux/usedTime/actions';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const ModalTable = ({ show, setShow, typeModal, positonEdit, usedTimeData }) => {
  const listOS = ['Android', 'iOS'];
  const [values, setValues] = useState({
    userNameI: '',
    oSNameI: '',
    dateI: moment(new Date()).format('YYYY-MM-DD'),
    youtubeI: 0,
    facebookI: 0,
    otherI: 0
  });
  const [errors, setErrors] = useState([]);
  const notifyS = () => toast.success('Succes');
  const notifyE = () => toast.error('Error');
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeModal === 'Edit') {
      const data = usedTimeData[positonEdit];
      setValues(data);
    }
  }, [positonEdit, usedTimeData]);
  const onHide = () => {
    setShow(false);
    setErrors([]);
    setValues({
      userNameI: '',
      oSNameI: '',
      dateI: moment(new Date()).format('YYYY-MM-DD'),
      youtubeI: 0,
      facebookI: 0,
      otherI: 0
    });
  };
  const handleChange = (event) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  function validate() {
    const { userNameI, oSNameI, youtubeI, facebookI, otherI } = values;
    const errors = [];
    if (userNameI.length < 5) {
      errors.push('userNameI should be at least 5 charcters long');
    }
    if (youtubeI === '') {
      errors.push('youtubeI should be at required');
    }
    if (otherI === '') {
      errors.push('facebookI should be at required');
    }
    if (facebookI === '') {
      errors.push('otherI should be at required');
    }
    if (oSNameI == '') {
      errors.push('oSNameI should be at required');
    }
    return errors;
  }

  const handleOKButtonClick = (event) => {
    event.preventDefault();
    const errors = validate();
    if (errors.length > 0) {
      notifyE();
      setErrors(errors);
      return;
    }
    const totalI = parseInt(values.youtubeI) + parseInt(values.facebookI) + parseInt(values.otherI);
    const newUsedTimeData = {
      userName: values.userNameI,
      oSName: values.oSNameI,
      date: values.dateI,
      useTimeNumber: totalI,
      facebookTimeUse: parseInt(values.facebookI),
      youtubeTimeUse: parseInt(values.youtubeI),
      other: parseInt(values.otherI)
    };
    if (typeModal === 'Add') {
      dispatch(postData(newUsedTimeData));
      setValues({
        userNameI: '',
        oSNameI: '',
        dateI: moment(new Date()).format('YYYY-MM-DD'),
        youtubeI: 0,
        facebookI: 0,
        otherI: 0
      });
      notifyS();
      setErrors([]);
    }
    if (typeModal === 'Edit') {
      dispatch(putData([newUsedTimeData, positonEdit]));
      setValues({
        userNameI: '',
        oSNameI: '',
        dateI: moment(new Date()).format('YYYY-MM-DD'),
        youtubeI: 0,
        facebookI: 0,
        otherI: 0
      });
      notifyS();
      setErrors([]);
    }
    setShow(false);
  };

  return (
    <div className="modalShowTable">
      <ToastContainer />
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="modal-custom-table"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header>
          <Modal.Title>{typeModal}</Modal.Title>
          <div className="modal-error">
            {errors.map((error) => (
              <p key={error}>Error: {error}</p>
            ))}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-contain">
            <div className="modal-item">
              <div className="modal-text-title">User Name</div>
              <input
                className="modal-text-input"
                defaultValue={values.userNameI}
                onChange={handleChange}
                placeholder="UserName"
                data-testid="UserNameI"
                name="userNameI"
              />
            </div>

            <div className="modal-item">
              <div className="modal-text-title">Os Name</div>
              <Form.Select
                aria-label="Default select example"
                data-testid="OSNameI"
                onChange={handleChange}
                name="oSNameI"
                value={values.oSNameI}>
                <option>Please select</option>
                {listOS.map((val, index) => {
                  return (
                    <option key={index + uuidv4()} value={val}>
                      {val}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </div>

          <div className="modal-contain">
            <div className="modal-item">
              <div className="modal-text-title">Date</div>
              <input
                className="modal-text-date"
                defaultValue={values.dateI}
                onChange={handleChange}
                placeholder="Date"
                type="date"
                required
                data-testid="DateI"
                name="dateI"
              />
            </div>

            <div className="modal-item">
              <div className="modal-text-title">Youtube</div>
              <input
                className="modal-text-input"
                defaultValue={values.youtubeI}
                onChange={handleChange}
                placeholder="YouTube"
                required
                data-testid="YouTubeI"
                name="youtubeI"
              />
            </div>
          </div>

          <div className="modal-contain">
            <div className="modal-item">
              <div className="modal-text-title">Facebook</div>
              <input
                className="modal-text-input"
                defaultValue={values.facebookI}
                onChange={handleChange}
                placeholder="Facebook"
                required
                data-testid="FacebookI"
                name="facebookI"
              />
            </div>

            <div className="modal-item">
              <div className="modal-text-title">Other</div>
              <input
                className="modal-text-input"
                defaultValue={values.otherI}
                onChange={handleChange}
                placeholder="Other"
                required
                data-testid="OtherI"
                name="otherI"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" data-testid="btnOK" onClick={handleOKButtonClick}>
            OK
          </Button>
          <Button variant="secondary" data-testid="btnCancel" onClick={onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalTable;
