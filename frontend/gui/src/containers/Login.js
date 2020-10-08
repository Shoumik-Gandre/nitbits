import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setState((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit login");
    axios.post("http://127.0.0.1:8000/rest-auth/login/", state).then((res) => {
      const token = res.data.key;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
    });
  }

  return (
    <div>
      Login Page
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={state.username}
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={state.password}
        />{" "}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
