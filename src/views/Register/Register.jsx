import "./Register.css";
import { useState, useContext } from "react";
import { registerUser } from "../../services/auth.service.js";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  getUserByHandle,
  createUserHandle,
} from "../../services/users.service.js";
import Button from "../../components/Button/Button.jsx";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const { user, setAppState } = useContext(AppContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const register = async () => {
    try {
      //TODO: Handle verification better
      const usernameCheck = await getUserByHandle(form.username);
      if (usernameCheck.exists()) {
        alert("Username already exists");
        return;
      }
      if (
        (!form.email || !form.password || !form.username,
        !form.firstName,
        !form.lastName)
      ) {
        alert("Please fill in all fields");
        return;
      }

      if (
        form.firstName.length < 4 ||
        form.firstName.length > 32 ||
        form.lastName.length < 4 ||
        form.lastName.length > 32
      ) {
        alert("First and last name must be between 4 and 32 characters");
        return;
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(
        form.username,
        credentials.user.uid,
        form.email,
        form.firstName,
        form.lastName
      );
      setAppState({ user: credentials.user, userData: null });
      navigate("/");
    } catch (error) {
      //TODO: Handle error
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
        return;
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format");
        return;
      } else {
        alert("An error occurred");
        console.error(error);
      }
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <div className="register__form">
        <div className="register__row">
          <div className="register__form-group">
            <label htmlFor="firstName">First name</label>
            <input
              value={form.firstName}
              onChange={updateForm("firstName")}
              type="text"
              id="firstName"
              name="firstName"
            />
          </div>
          <div className="register__form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              value={form.lastName}
              onChange={updateForm("lastName")}
              type="text"
              id="lastName"
              name="lastName"
            />
          </div>
        </div>
        <div className="register__row">
          <div className="register__form-group">
            <label htmlFor="username">Username</label>
            <input
              value={form.username}
              onChange={updateForm("username")}
              type="text"
              id="username"
              name="username"
            />
          </div>
        </div>
        <div className="register__row">
          <div className="register__form-group">
            <label htmlFor="email">Email</label>
            <input
              value={form.email}
              onChange={updateForm("email")}
              type="email"
              id="email"
              name="email"
            />
          </div>
        </div>
        <div className="register__row">
          <div className="register__form-group">
            <label htmlFor="password">Password</label>
            <input
              value={form.password}
              onChange={updateForm("password")}
              type="password"
              id="password"
              name="password"
            />
          </div>
        </div>
        <Button onClick={register}>Register</Button>
      </div>
    </div>
  );
}

export default Register;
