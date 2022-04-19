import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postData, putData } from '../../redux/usedTime/actions';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalTable = ({ show, setShow, typeModal, positonEdit, usedTimeData, setTypeModal }) => {
  const listOS = ['Android', 'iOS'];
  const initvalues = {
    userNameI: '',
    oSNameI: '',
    dateI: moment(new Date()).format('YYYY-MM-DD'),
    youtubeI: '',
    facebookI: '',
    otherI: '',
    isInput: ''
  };
  const [initData, setInitData] = useState(initvalues);
  const notifyS = () => toast.success('Success');
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeModal === 'Edit') {
      const data = usedTimeData[positonEdit];
      setInitData({
        userNameI: data.userName,
        oSNameI: data.oSName,
        dateI: data.date,
        youtubeI: data.youtubeTimeUse,
        facebookI: data.facebookTimeUse,
        otherI: data.other
      });
    }
  }, [positonEdit, usedTimeData, typeModal]);

  const onHide = () => {
    setTypeModal('');
    setInitData(initvalues);
    setShow(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initData,
    validationSchema: Yup.object(
      {
        userNameI: Yup.string()
          .required('Required!')
          .min(8, 'Mininum 8 characters')
          .max(255, 'Maximum 255 characters'),
        oSNameI: Yup.string().required('Required!'),
        dateI: Yup.string().required('Required'),
        facebookI: Yup.lazy(() =>
          Yup.number()
            .typeError('you must specify a number')
            .min(0, 'Min value 0.')
            .max(500, 'Max value 500.')
            .when(['youtubeI', 'otherI'], {
              is: (youtubeI, otherI) => !youtubeI && !otherI,
              then: Yup.number().required('enter facebook or youtube')
            })
        ),
        youtubeI: Yup.lazy(() =>
          Yup.number()
            .typeError('you must specify a number')
            .min(0, 'Min value 0.')
            .max(500, 'Max value 500.')
            .when(['facebookI', 'otherI'], {
              is: (facebookI, otherI) => !facebookI && !otherI,
              then: Yup.number().required('enter facebook or youtube')
            })
        ),
        otherI: Yup.lazy(() =>
          Yup.number()
            .typeError('you must specify a number')
            .min(0, 'Min value 0.')
            .max(500, 'Max value 500.')
            .when(['facebookI', 'youtubeI'], {
              is: (facebookI, youtubeI) => !facebookI && !youtubeI,
              then: Yup.number().required('enter facebook or youtube')
            })
        )
      },
      [
        ['youtubeI', 'facebookI'],
        ['youtubeI', 'otherI'],
        ['facebookI', 'otherI']
      ]
    ),
    onSubmit: (initData) => {
      if (initData.facebookI == '') {
        initData.facebookI = '0';
      }
      if (initData.youtubeI == '') {
        initData.youtubeI = '0';
      }
      if (initData.otherI == '') {
        initData.otherI = '0';
      }
      const totalI =
        parseInt(initData.youtubeI) + parseInt(initData.facebookI) + parseInt(initData.otherI);
      const newUsedTimeData = {
        userName: initData.userNameI,
        oSName: initData.oSNameI,
        date: initData.dateI,
        useTimeNumber: totalI,
        facebookTimeUse: parseInt(initData.facebookI),
        youtubeTimeUse: parseInt(initData.youtubeI),
        other: parseInt(initData.otherI)
      };
      if (typeModal === 'Add') {
        dispatch(postData(newUsedTimeData));
        initData.userNameI = '';
        initData.oSNameI = '';
        initData.facebookI = '';
        initData.youtubeI = '';
        initData.otherI = '';
      }
      if (typeModal === 'Edit') {
        dispatch(putData([newUsedTimeData, positonEdit]));
      }
      onHide();
      notifyS();
    }
  });

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
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-contain">
              <div className="modal-item">
                <div className="modal-text-title">User Name</div>
                <input
                  className={
                    formik.errors.userNameI && formik.touched.userNameI
                      ? 'modal-text-input error-input'
                      : 'modal-text-input'
                  }
                  value={formik.values.userNameI}
                  onChange={formik.handleChange}
                  placeholder="UserName"
                  data-testid="UserNameI"
                  name="userNameI"
                />
                {formik.touched.userNameI && formik.errors.userNameI && (
                  <p>{formik.errors.userNameI}</p>
                )}
              </div>
              <div className="modal-item">
                <div className="modal-text-title">Os Name</div>
                <Form.Select
                  aria-label="Default select example"
                  data-testid="OSNameI"
                  onChange={formik.handleChange}
                  name="oSNameI"
                  className={formik.errors.oSNameI && formik.touched.oSNameI ? 'error-input' : ''}
                  value={formik.values.oSNameI}>
                  <option>Please select</option>
                  {listOS.map((val, index) => {
                    return (
                      <option key={index + uuidv4()} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </Form.Select>
                {formik.touched.oSNameI && formik.errors.oSNameI && <p>{formik.errors.oSNameI}</p>}
              </div>
            </div>
            <div className="modal-contain">
              <div className="modal-item">
                <div className="modal-text-title">Date</div>
                <input
                  className={
                    formik.touched.dateI && formik.errors.dateI
                      ? 'modal-text-date error-input'
                      : 'modal-text-date'
                  }
                  value={moment(formik.values.dateI).format('YYYY-MM-DD')}
                  onChange={formik.handleChange}
                  placeholder="Date"
                  type="date"
                  data-testid="DateI"
                  name="dateI"
                />
                {formik.touched.dateI && formik.errors.dateI && <p>{formik.errors.dateI}</p>}
              </div>

              <div className="modal-item">
                <div className="modal-text-title">Youtube</div>
                <input
                  className={
                    (formik.touched.youtubeI && formik.errors.youtubeI) ||
                    (formik.touched.facebookI && formik.errors.facebookI)
                      ? 'modal-text-input error-input'
                      : 'modal-text-input'
                  }
                  value={formik.values.youtubeI}
                  onChange={formik.handleChange}
                  placeholder="0"
                  data-testid="YouTubeI"
                  name="youtubeI"
                />
                {formik.touched.youtubeI && formik.errors.youtubeI && (
                  <p>{formik.errors.youtubeI}</p>
                )}
              </div>
            </div>
            <div className="modal-contain">
              <div className="modal-item">
                <div className="modal-text-title">Facebook</div>
                <input
                  className={
                    (formik.touched.youtubeI && formik.errors.youtubeI) ||
                    (formik.touched.facebookI && formik.errors.facebookI)
                      ? 'modal-text-input error-input'
                      : 'modal-text-input'
                  }
                  value={formik.values.facebookI}
                  onChange={formik.handleChange}
                  placeholder="0"
                  data-testid="FacebookI"
                  name="facebookI"
                />
                {formik.touched.facebookI && formik.errors.facebookI && (
                  <p>{formik.errors.facebookI}</p>
                )}
              </div>

              <div className="modal-item">
                <div className="modal-text-title">Other</div>
                <input
                  className={
                    formik.touched.otherI && formik.errors.otherI
                      ? 'modal-text-input error-input'
                      : 'modal-text-input'
                  }
                  value={formik.values.otherI}
                  onChange={formik.handleChange}
                  placeholder="0"
                  data-testid="OtherI"
                  name="otherI"
                />
                {formik.touched.otherI && formik.errors.otherI && <p>{formik.errors.otherI}</p>}
              </div>
            </div>
            <div className="d-flex justify-content-end modal-buton">
              <Button variant="secondary" data-testid="btnCancel" onClick={onHide}>
                Cancel
              </Button>
              <Button
                variant="success"
                className="modal-buton-ok"
                data-testid="btnOK"
                type="submit">
                OK
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalTable;
