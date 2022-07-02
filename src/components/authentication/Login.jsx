import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// style
import "./styles.css";

// api
import axios from "../../utils/axios";
import { postAPI } from "../../api";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { pathname } = window.location;
    if (token && !pathname.includes("timesheets")) {
      navigate("/timesheets");
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(postAPI().login, data);
      const { status } = res.data;
      if (status === "error") {
        setError(res.data.message);
      } else if (status === "success") {
        localStorage.setItem("token", res.data.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        e.returnValue = true;
        navigate("/timesheets");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeEmail = (e) => {
    const { value } = e.target;
    setData((prevState) => ({
      ...prevState,
      email: value,
    }));
  };

  const onChangePassword = (e) => {
    const { value } = e.target;
    setData((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  return (
    <div className="main-container">
      <span className="title">Login</span>
      <input
        className="custom-input margin"
        placeholder="Email"
        type="email"
        onChange={onChangeEmail}
      />
      <input
        className="custom-input margin"
        placeholder="Password"
        type="password"
        onChange={onChangePassword}
      />
      <span className="error">{error}</span>
      <Link className="button active login" to="/timesheets" onClick={login}>
        Login
      </Link>
    </div>
  );
}

export default Login;
