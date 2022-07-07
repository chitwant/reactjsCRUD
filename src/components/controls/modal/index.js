import React from "react";
import { Modal } from "react-bootstrap";

const ModalPopup = ({ show, onHide, userdata, body,title,footer }) => {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <div>
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
          </div>
        </Modal.Header>

        <div className="modal-body">{body}</div>
        <div className="modal-footer">
         {footer}
        </div>
      </Modal>
    </>
  );
};
export default ModalPopup;
