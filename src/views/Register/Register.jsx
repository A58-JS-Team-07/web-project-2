import "./Register.css";
import { useState, useEffect, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Button from "../../components/Button/Button.jsx";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    tel: "",
    password: "",
  });
  const { user, setAppState } = useContext(AppContext);
  const navigate = useLocation();
 
  return (
    <div className="register">
      <h1>Register</h1>
      <div className="register__form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className="register__form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className="register__form-group">
        <label htmlFor="tel">Phone</label>
        <input type="tel" id="tel" name="tel" />
      </div>
      <div className="register__form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <Button>Register</Button>
    </div>
  );
}

export default Register;
