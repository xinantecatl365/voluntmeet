import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import CreatePublication from "../publications/CreatePublication";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";

const Menu = () => {
  const { currentUser, logout } = UserAuth();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">voluntMeet</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#meet.us">Conocenos</Nav.Link>
              <Nav.Link href="#help">Ayuda</Nav.Link>
              <NavDropdown title="Sesion" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/login">Iniciar sesion</NavDropdown.Item>
                <NavDropdown.Item href="/signup">
                Crear cuenta
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            
            {currentUser ? (
              <div className="d-flex">
                <div className="me-2">
                  <CreatePublication />
                </div>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => {
                    logout();
                  }}
                >
                  Cerrar sesion
                </button>
              </div>
            ) : (
              <span></span>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
