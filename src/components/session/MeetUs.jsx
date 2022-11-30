import React from "react";
import { Container } from "react-bootstrap";

const MeetUs = () => {
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <Container>
          <div className="jumbotron">
            <h1>Conócenos</h1>
            <p>
              voluntMeet es un proyecto escolar del Instituto Tecnológico de Toluca enfocado en el voluntariado
              ambiental del municipio de Toluca y alrededores. El nombre surge de la palabra voluntario y Meet
              (conocer en inglés), haciendo referencia a la capacidad de conocer
              más gente dispuesta a ayudar.
            </p>
          </div>

          <div className="jumbotron row">
            <h1>Objetivos</h1>
            <ul>
              <li>Incrementar el número de interesados en obras ambientales</li>
              <li>Informar mediante la participación de la comunidad</li>
              <li>Concientizar en el entorno urbano</li>
            </ul>
          </div>
        </Container>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default MeetUs;
