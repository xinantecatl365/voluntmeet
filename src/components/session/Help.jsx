import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const MeetUs = () => {
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <Container>
          <div className="jumbotron">
            <h1>Contacto</h1>
            <p>
              Para más información, usar el correo: amoralesv1@toluca.tecnm.mx
            </p>
          </div>

          <div className="jumbotron">
            <h1>Preguntas frecuentes</h1>
            <Card className="mb-2">
              <Card.Body>
                <h4>¿Cómo puedo agregar publicaciones?</h4>
                <p>Necesitas registrarte mediante un correo y contraseña</p>
              </Card.Body>
            </Card>
            <Card className="mb-2">
              <Card.Body>
                <h4>¿Cómo me registro?</h4>
                <p>
                  En el menú superior, hacer click sobre "Sesión" y después
                  sobre "Crear cuenta"
                </p>
              </Card.Body>
            </Card>
            <Card className="mb-2">
              <Card.Body>
                <h4>¿Cómo ingresar con mi cuenta?</h4>
                <p>
                  En el menú superior, hacer click sobre "Sesión" y después
                  sobre "Iniciar sesión"
                </p>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default MeetUs;
