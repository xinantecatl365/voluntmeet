import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");

  const { signIn } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      alert("Introducir el email");
      return;
    }
    if (!password1) {
      alert("Introducir la contraseña");
      return;
    }

    try {
      await signIn(email, password1);
      navigate("/");
      console.log('Iniciar sesio correcto');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-control mt-3">
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
      <div className="mb-3">
        <label htmlFor="input-password1" className="form-label">
          Contraseña
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
      <div className="mx-auto">
        <button type="submit" className="btn btn-primary ">
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
