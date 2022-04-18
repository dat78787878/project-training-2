// import React, { useEffect, useState } from 'react';
// import { Button, Form, Modal } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { postData, putData } from '../../redux/usedTime/actions';
// import { v4 as uuidv4 } from 'uuid';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import moment from 'moment';
// import ErrorValidate from './ErrorValidate';

// const ModalTable = ({ show, setShow, typeModal, positonEdit, usedTimeData }) => {
//   const listOS = ['Android', 'iOS'];
//   const [values, setValues] = useState({
//     userNameI: '',
//     oSNameI: '',
//     dateI: moment(new Date()).format('YYYY-MM-DD'),
//     youtubeI: '',
//     facebookI: '',
//     otherI: ''
//   });
//   const [errors, setErrors] = useState([]);
//   const notifyS = () => toast.success('Succes');
//   const notifyE = () => toast.error('Error');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (typeModal === 'Edit') {
//       const data = usedTimeData[positonEdit];
//       setValues({
//         userNameI: data.userName,
//         oSNameI: data.oSName,
//         dateI: data.date,
//         youtubeI: data.youtubeTimeUse,
//         facebookI: data.facebookTimeUse,
//         otherI: data.other
//       });
//     }
//   }, [positonEdit, usedTimeData]);

//   const onHide = () => {
//     setShow(false);
//     setErrors([]);
//     setValues({
//       userNameI: '',
//       oSNameI: '',
//       dateI: moment(new Date()).format('YYYY-MM-DD'),
//       youtubeI: '',
//       facebookI: '',
//       otherI: ''
//     });
//   };
//   const handleChange = (event) => {
//     event.persist();
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };
//   function validate() {
//     const { userNameI, oSNameI, youtubeI, facebookI, otherI } = values;
//     const errors = [];
//     if (userNameI.length < 5) {
//       errors.push('userNameI should be at least 5 charcters long');
//     }
//     if (youtubeI === '') {
//       errors.push('youtubeI should be at required');
//     }
//     if (otherI === '') {
//       errors.push('facebookI should be at required');
//     }
//     if (facebookI === '') {
//       errors.push('otherI should be at required');
//     }
//     if (oSNameI == '') {
//       errors.push('oSNameI should be at required');
//     }
//     return errors;
//   }

//   const handleOKButtonClick = (event) => {
//     event.preventDefault();
//     const errors = validate();
//     if (errors.length > 0) {
//       notifyE();
//       setErrors(errors);
//       return;
//     }
//     const totalI = parseInt(values.youtubeI) + parseInt(values.facebookI) + parseInt(values.otherI);
//     const newUsedTimeData = {
//       userName: values.userNameI,
//       oSName: values.oSNameI,
//       date: values.dateI,
//       useTimeNumber: totalI,
//       facebookTimeUse: parseInt(values.facebookI),
//       youtubeTimeUse: parseInt(values.youtubeI),
//       other: parseInt(values.otherI)
//     };
//     if (typeModal === 'Add') {
//       dispatch(postData(newUsedTimeData));
//       setValues({
//         userNameI: '',
//         oSNameI: '',
//         dateI: moment(new Date()).format('YYYY-MM-DD'),
//         youtubeI: '',
//         facebookI: '',
//         otherI: ''
//       });
//       notifyS();
//       setErrors([]);
//     }
//     if (typeModal === 'Edit') {
//       dispatch(putData([newUsedTimeData, positonEdit]));
//       setValues({
//         userNameI: '',
//         oSNameI: '',
//         dateI: moment(new Date()).format('YYYY-MM-DD'),
//         youtubeI: '',
//         facebookI: '',
//         otherI: ''
//       });
//       notifyS();
//       setErrors([]);
//     }
//     setShow(false);
//   };

//   return (
//     <div className="modalShowTable">
//       <ToastContainer />
//       <Modal
//         show={show}
//         onHide={onHide}
//         dialogClassName="modal-custom-table"
//         aria-labelledby="example-custom-modal-styling-title">
//         <Modal.Header>
//           <Modal.Title>{typeModal}</Modal.Title>
//           <ErrorValidate errors={errors} />
//         </Modal.Header>
//         <Modal.Body>
//           <div className="modal-contain">
//             <div className="modal-item">
//               <div className="modal-text-title">User Name</div>
//               <input
//                 className="modal-text-input"
//                 defaultValue={values.userNameI}
//                 onChange={handleChange}
//                 placeholder="UserName"
//                 data-testid="UserNameI"
//                 name="userNameI"
//               />
//             </div>

//             <div className="modal-item">
//               <div className="modal-text-title">Os Name</div>
//               <Form.Select
//                 aria-label="Default select example"
//                 data-testid="OSNameI"
//                 onChange={handleChange}
//                 name="oSNameI"
//                 value={values.oSNameI}>
//                 <option>Please select</option>
//                 {listOS.map((val, index) => {
//                   return (
//                     <option key={index + uuidv4()} value={val}>
//                       {val}
//                     </option>
//                   );
//                 })}
//               </Form.Select>
//             </div>
//           </div>

//           <div className="modal-contain">
//             <div className="modal-item">
//               <div className="modal-text-title">Date</div>
//               <input
//                 className="modal-text-date"
//                 value={moment(values.dateI).format('YYYY-MM-DD')}
//                 onChange={handleChange}
//                 placeholder="Date"
//                 type="date"
//                 data-testid="DateI"
//                 name="dateI"
//               />
//             </div>

//             <div className="modal-item">
//               <div className="modal-text-title">Youtube</div>
//               <input
//                 className="modal-text-input"
//                 value={values.youtubeI}
//                 onChange={handleChange}
//                 placeholder="0"
//                 data-testid="YouTubeI"
//                 name="youtubeI"
//               />
//             </div>
//           </div>

//           <div className="modal-contain">
//             <div className="modal-item">
//               <div className="modal-text-title">Facebook</div>
//               <input
//                 className="modal-text-input"
//                 value={values.facebookI}
//                 onChange={handleChange}
//                 placeholder="0"
//                 data-testid="FacebookI"
//                 name="facebookI"
//               />
//             </div>

//             <div className="modal-item">
//               <div className="modal-text-title">Other</div>
//               <input
//                 className="modal-text-input"
//                 value={values.otherI}
//                 onChange={handleChange}
//                 placeholder="0"
//                 data-testid="OtherI"
//                 name="otherI"
//               />
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" data-testid="btnCancel" onClick={onHide}>
//             Cancel
//           </Button>
//           <Button variant="success" data-testid="btnOK" onClick={handleOKButtonClick}>
//             OK
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ModalTable;

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

const ModalTable = ({ show, setShow, typeModal, positonEdit, usedTimeData }) => {
  const listOS = ['Android', 'iOS'];
  const initvalues = {
    userNameI: '',
    oSNameI: '',
    dateI: moment(new Date()).format('YYYY-MM-DD'),
    youtubeI: '',
    facebookI: '',
    otherI: ''
  };
  const [values, setValues] = useState(initvalues);
  const notifyS = () => toast.success('Succes');
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeModal === 'Edit') {
      const data = usedTimeData[positonEdit];
      setValues({
        userNameI: data.userName,
        oSNameI: data.oSName,
        dateI: data.date,
        youtubeI: data.youtubeTimeUse,
        facebookI: data.facebookTimeUse,
        otherI: data.other
      });
    }
  }, [positonEdit, usedTimeData]);

  const onHide = () => {
    setShow(false);
    setValues(initvalues);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      userNameI: Yup.string()
        .min(8, 'Mininum 2 characters')
        .max(255, 'Maximum 15 characters')
        .required('Required!'),
      oSNameI: Yup.string().required('Required!'),
      dateI: Yup.string().required('Required'),
      facebookI: Yup.string()
        .min(1, 'Mininum 2 characters')
        .required('Required')
        .matches(/^\d+$/, 'Input Number'),
      youtubeI: Yup.string()
        .min(1, 'Mininum 2 characters')
        .required('Required')
        .matches(/^\d+$/, 'Input Number'),
      otherI: Yup.string()
        .min(1, 'Mininum 2 characters')
        .required('Required')
        .matches(/^\d+$/, 'Input Number')
    }),
    onSubmit: (values) => {
      const totalI =
        parseInt(values.youtubeI) + parseInt(values.facebookI) + parseInt(values.otherI);
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
      }
      if (typeModal === 'Edit') {
        dispatch(putData([newUsedTimeData, positonEdit]));
      }
      notifyS();
      onHide();
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
                {formik.errors.userNameI && formik.touched.userNameI && (
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
                {formik.errors.oSNameI && formik.touched.oSNameI && <p>{formik.errors.oSNameI}</p>}
              </div>
            </div>
            <div className="modal-contain">
              <div className="modal-item">
                <div className="modal-text-title">Date</div>
                <input
                  className="modal-text-date"
                  value={moment(formik.values.dateI).format('YYYY-MM-DD')}
                  onChange={formik.handleChange}
                  placeholder="Date"
                  type="date"
                  data-testid="DateI"
                  name="dateI"
                />
                {formik.errors.dateI && formik.touched.dateI && <p>{formik.errors.dateI}</p>}
              </div>

              <div className="modal-item">
                <div className="modal-text-title">Youtube</div>
                <input
                  className="modal-text-input"
                  value={formik.values.youtubeI}
                  onChange={formik.handleChange}
                  placeholder="0"
                  data-testid="YouTubeI"
                  name="youtubeI"
                />
                {formik.errors.youtubeI && formik.touched.youtubeI && (
                  <p>{formik.errors.youtubeI}</p>
                )}
              </div>
            </div>
            <div className="modal-contain">
              <div className="modal-item">
                <div className="modal-text-title">Facebook</div>
                <input
                  className="modal-text-input"
                  value={formik.values.facebookI}
                  onChange={formik.handleChange}
                  placeholder="0"
                  data-testid="FacebookI"
                  name="facebookI"
                />
                {formik.errors.facebookI && formik.touched.facebookI && (
                  <p>{formik.errors.facebookI}</p>
                )}
              </div>

              <div className="modal-item">
                <div className="modal-text-title">Other</div>
                <input
                  className="modal-text-input"
                  value={formik.values.otherI}
                  onChange={formik.handleChange}
                  placeholder="0"
                  data-testid="OtherI"
                  name="otherI"
                />
                {formik.errors.otherI && formik.touched.otherI && <p>{formik.errors.otherI}</p>}
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
