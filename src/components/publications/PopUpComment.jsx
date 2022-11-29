import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserAuth } from "../context/AuthContext";
import { Container } from "react-bootstrap";

function PopUpComments() {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const {
    fStorePub,
    currentUser,
    storageUpload,
    fStoreSetImage,
    storageRef,
    downloadURL,
  } = UserAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Comentarios
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Comentarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <p>Aqui se muestran los comentarios</p>
            {comments.length === 0 ? (
              <p>Aun no hay comentarios</p>
            ) : (
              <span>hola</span>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpComments;
