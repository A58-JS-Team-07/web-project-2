import "./Login.css";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import { loginUser } from "../../services/auth.service";

function Login() {
  const { user, setAppState } = useContext(AppContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || "/");
    }
  }, [user]);

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const login = async () => {
    //TODO: Handle errors
    if (!form.email || !form.password)
      return alert("Please fill in all fields");
    if (form.email.includes("@") === false)
      return alert("Please enter a valid email address");

    try {
      const { user } = await loginUser(form.email, form.password);
      setAppState({ user, userData: null });
      navigate(location.state?.from.pathname || "/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="login__form">
        <div className="login__form-group">
          <label htmlFor="email">Email</label>
          <input
            value={form.email}
            onChange={updateForm("email")}
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div className="login__form-group">
          <label htmlFor="password">Password</label>
          <input
            value={form.password}
            onChange={updateForm("password")}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <Button onClick={login}>Login</Button>
      </div>
    </div>
  );
}

export default Login;
