import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import PopUpComments from "../publications/PopUpComment";

function CardLocal({ imagePath, title, description, idFbs, name }) {
  return (
    <div>
      <div className="card" style={{ width: "85%" }}>
        <div className="card-body">
          <h4 style={{ textAlign: "center" }}>{name}</h4>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <Container>
          <Card.Img
            variant="top"
            src={imagePath}
            style={{ marginBottom: "1%" }}
          />
        </Container>
        <div>
          <div className="row mb-3">
            <div className="col"></div>
            <div className="col">
              <PopUpComments idFbs={idFbs} />
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Publication({
  imagePath,
  title,
  description,
  idFbs,
  name,
}) {
  return (
    <>
      <Container style={{ paddingTop: "1%" }}>
        <CardLocal
          imagePath={imagePath}
          title={title}
          description={description}
          idFbs={idFbs}
          name={name}
        />
      </Container>
    </>
  );
}
