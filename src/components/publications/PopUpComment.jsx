import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserAuth } from "../context/AuthContext";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useEffect } from "react";

function PopUpComments({ idFbs }) {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { currentUser, fStoreComment, getComments } = UserAuth();

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
  };

  const retrieveComments = async () => {
    try {
      const docs = await getComments(idFbs);
      let auxComments = [];
      let aux = null;
      docs.forEach((doc) => {
        aux = { id: doc.id, ...doc.data() };
        auxComments.push(aux);
      });
      setComments(auxComments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveComments();
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      alert("Comentario vacío");
      return;
    }

    try {
      const docref = await fStoreComment(comment, currentUser.uid, idFbs);
      alert("Comentario guardado con éxito");
      setComment("");
      retrieveComments();
    } catch (error) {
      console.log(error);
      alert("Error guardando comentario");
    }
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
            {comments.length === 0 ? (
              <p>Aun no hay comentarios</p>
            ) : (
              comments.map((el) => (
                <div
                  key={el.id + "_key"}
                  className={"mb-1"}
                  style={{ borderStyle: "solid", borderRadius: "5px" }}
                >
                  <h6>
                    {el.name} {el.lname}
                  </h6>
                  <p>{el.comment}</p>
                </div>
              ))
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {currentUser ? (
            <>
              <Form>
                <Form.Group className="mb-3" controlId="textAreaComment">
                  <Form.Control
                    as="textarea"
                    placeholder="Comentario"
                    rows={3}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    value={comment}
                  />
                </Form.Group>
              </Form>
              <Button variant="outline-primary" onClick={handleSubmit}>
                Comentar
              </Button>
            </>
          ) : (
            <p>Inicia sesion para comentar</p>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpComments;
