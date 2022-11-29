import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserAuth } from "../context/AuthContext";

function PopUpForm() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

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
    try {
      let publication = {
        title: title,
        description: description,
        user: currentUser.uid,
      };
      const docref = await fStorePub(publication);
      const stRef = storageRef(docref.id);
      console.log(stRef);
      await storageUpload(selectedImage, stRef);
      downloadURL(stRef)
        .then(async (url) => {
          try {
            setImageURL(url);
            await fStoreSetImage(docref.id, { ...publication, imageURL: url });
          } catch (error1) {
            console.log(error1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      alert(`Exito en la subida`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Crear publicacion
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="form-control">
            <div className="mb-3">
              <label htmlFor="input-titulo" className="form-label">
                Título
              </label>
              <input
                type="text"
                className="form-control"
                id="input-titulo"
                placeholder="Título"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="input-desc" className="form-label">
                Nombre(s)
              </label>
              <textarea
                type="text"
                className="form-control"
                id="input-desc"
                placeholder="Descripción"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Seleccionar imagen
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                name="myImage"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </div>
            <input type="submit" value="Publicar" className="btn btn-primary" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpForm;
