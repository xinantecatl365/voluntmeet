import React from "react";
import FormLogin from "../forms/FormLogin";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { currentUser } = UserAuth();
  const navigate = useNavigate()

  return (
    <div>
      {currentUser?navigate("/"):<span></span>}
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <FormLogin/>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Login;
