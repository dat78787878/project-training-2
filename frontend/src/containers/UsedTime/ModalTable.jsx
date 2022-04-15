import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postData, putData } from '../../redux/usedTime/actions';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalTable = ({ show, setShow, typeModal, positonEdit, usedTimeData }) => {
  const [userNameI, setUserNameI] = useState('');
  const [oSNameI, setOSNameI] = useState('');
  const [dateI, setDateI] = useState('');
  const [youtubeI, setYouTubeI] = useState(0);
  const [facebookI, setFacebookI] = useState(0);
  const [otherI, setOtherI] = useState(0);
  const listOS = ['Android', 'iOS'];
  const notifyS = () => toast.success('Succes');

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeModal === 'Edit') {
      const data = usedTimeData[positonEdit];
      setUserNameI(data.userName);
      setOSNameI(data.oSName);
      setDateI(data.date);
      setFacebookI(data.facebookTimeUse);
      setYouTubeI(data.youtubeTimeUse);
      setOtherI(data.other);
    }
  }, [positonEdit, usedTimeData]);
  const onHide = () => {
    setShow(false);
  };
  const handleUserNameI = (e) => {
    e.preventDefault();
    setUserNameI(e.target.value);
  };
  const handleOSNameI = (e) => {
    e.preventDefault();
    setOSNameI(e.target.value);
  };
  const handleDateI = (e) => {
    e.preventDefault();
    setDateI(e.target.value);
  };
  const handleYouTubeI = (e) => {
    e.preventDefault();
    setYouTubeI(e.target.value);
  };
  const handleFacebookI = (e) => {
    e.preventDefault();
    setFacebookI(e.target.value);
  };
  const handleOtherI = (e) => {
    e.preventDefault();
    setOtherI(e.target.value);
  };
  const handleOKButtonClick = () => {
    const totalI = parseInt(youtubeI) + parseInt(facebookI) + parseInt(otherI);
    const newUsedTimeData = {
      userName: userNameI,
      oSName: oSNameI,
      date: dateI,
      useTimeNumber: totalI,
      facebookTimeUse: parseInt(facebookI),
      youtubeTimeUse: parseInt(youtubeI),
      other: parseInt(otherI)
    };
    if (typeModal === 'Add') {
      dispatch(postData(newUsedTimeData));
      notifyS();
    }
    if (typeModal === 'Edit') {
      dispatch(putData([newUsedTimeData, positonEdit]));
      notifyS();
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
        <Modal.Header closeButton>
          <Modal.Title>{typeModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="modal-text-input"
            value={userNameI}
            onChange={handleUserNameI}
            placeholder="UserName"
            required
            data-testid="UserNameI"
          />
          <Form.Select
            aria-label="Default select example"
            data-testid="OSNameI"
            onChange={handleOSNameI}
            value={oSNameI}>
            <option>Please select</option>
            {listOS.map((val, index) => {
              return (
                <option key={index + uuidv4()} value={val}>
                  {val}
                </option>
              );
            })}
          </Form.Select>
          <input
            className="modal-text-date"
            value={dateI}
            onChange={handleDateI}
            placeholder="Date"
            type="date"
            required
            data-testid="DateI"
          />
          <input
            className="modal-text-input"
            value={youtubeI}
            onChange={handleYouTubeI}
            placeholder="YouTube"
            required
            data-testid="YouTubeI"
          />
          <input
            className="modal-text-input"
            value={facebookI}
            onChange={handleFacebookI}
            placeholder="Facebook"
            required
            data-testid="FacebookI"
          />
          <input
            className="modal-text-input"
            value={otherI}
            onChange={handleOtherI}
            placeholder="Other"
            required
            data-testid="OtherI"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" data-testid="btnOK" onClick={handleOKButtonClick}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalTable;
