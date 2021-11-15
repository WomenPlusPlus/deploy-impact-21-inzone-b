import React from "react";
import { Button, Modal } from "react-bootstrap";

const McqModal = ({
  showSubmitModal,
  handleCloseModal,
  modalMessage,
  modalTitle,
  modalButton,
}) => {
  return (
    <>
      <Modal show={showSubmitModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        {/* {chosenAnswers} */}
        <Modal.Footer>
          {/* TODO: send data to backend */}
          <Button variant="primary" onClick={handleCloseModal}>
            {modalButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default McqModal;
