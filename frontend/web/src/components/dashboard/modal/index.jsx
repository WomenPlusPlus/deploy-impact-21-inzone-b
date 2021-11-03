import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap';    

import './modal.scss'
import celebrationImg from "../../../assets/dashboard/celebration.svg"

const CongratulationsModal = () => {
    const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
      <section className="modal__container">
      <div className="column__left">
        <Modal.Header>
          <Modal.Title>Welcome to your ExamPortal account, Jane!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        You can use this portal to do your exams, check your course progress and communicate with your tutors!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay, thanks
          </Button>
        </Modal.Footer>
      </div>
      <div className="columnright">
          <img id="img__congratulations" src={celebrationImg} alt="congratulations you are logged in" />
      </div>

      </section>
      </Modal>
    </>
  );
}

export default CongratulationsModal
