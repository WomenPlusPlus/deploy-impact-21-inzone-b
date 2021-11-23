import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./_mcqmodal.scss";

const McqModal = ({
  showSubmitModal,
  handleCloseModal,
  modalMessage,
  modalTitle,
  modalButton,
  modalImage,
}) => {
  return (
    <>
      <Modal id="mcq__modal" show={showSubmitModal} centered>
        <div>
          <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{modalMessage}</div>
          </Modal.Body>
          {/* {chosenAnswers} */}
          <Modal.Footer>
            {/* TODO: send data to backend */}
            <Button variant="primary" onClick={handleCloseModal}>
              {modalButton}
            </Button>
          </Modal.Footer>
        </div>
        <div>
          {modalImage ? (
            <div>
              <img id="modal__image" src={modalImage} alt="modal" />
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </>
  );
};

export default McqModal;
