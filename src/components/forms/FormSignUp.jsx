import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const FormSignup = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [lName, setLName] = useState("");

  const { createUser, fStoreUser } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      alert("Introducir el nombre");
      return;
    }
    if (!lName) {
      alert("Introducir el apellido");
      return;
    }
    if (!email) {
      alert("Introducir el email");
      return;
    }
    if (!password1) {
      alert("Introducir la contraseña");
      return;
    }
    if (!password2) {
      alert("Repetir la contraseña");
      return;
    }
    if (password1 !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    createUser(email, password1)
      .then(async (userCredential) => {
        //console.log(`credential ${JSON.stringify(userCredential.user)}`);
        //console.log(`credential ${JSON.stringify(userCredential.user.uid)}`);
        const user1 = { name: name, lName: lName, admin: false };
        try {
          await fStoreUser(userCredential.user.uid, user1);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-control mt-3">
      <div className="mb-3">
        <label htmlFor="input-name" className="form-label">
          Nombre(s)
        </label>
        <input
          type="text"
          className="form-control"
          id="input-name"
          placeholder="Nombre"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="input-l-name" className="form-label">
          Apellidos
        </label>
        <input
          type="text"
          className="form-control"
          id="input-l-name"
          placeholder="Apellido"
          onChange={(e) => {
            setLName(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="input-email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="input-email"
          aria-describedby="emailHelp"
          placeholder="ejemplo@ejemplo.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div id="emailHelp" className="form-text">
          Este email solo se usa para iniciar sesión
        </div>
      </div>
      <div id="passwordHelp" className="form-text">
        La contraseña debe ser de al menos 6 caracteres
      </div>
      <div className="mb-3">
        <label htmlFor="input-password1" className="form-label">
          Introducir tu contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="input-password1"
          placeholder="******"
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="input-password2" className="form-label">
          Repetir tu contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="input-password2"
          placeholder="******"
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
      </div>
      <div className="mx-auto">
        <button type="submit" className="btn btn-primary ">
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default FormSignup;
