import React, { useState } from "react";
import axios from "axios";
import { logout } from "../store/actions/auth";

function Home(props) {
  const [state, setState] = useState({
    token: localStorage.getItem("token"),
    expirationDate: localStorage.getItem("expirationDate"),
  });

  const logoutUpdate = () => {
    axios
      .post("http://127.0.0.1:8000/rest-auth/logout/")
      .then(function (response) {
        console.log("logout");
        logout();
        setState({
          token: localStorage.getItem("token"),
          expirationDate: localStorage.getItem("expirationDate"),
        });
      })
      .catch(function (error) {
        console.log("Error on Authentication");
      });
  };

  return (
    <div>
      <h3>Home Page</h3>
      <h4>token: {state.token}</h4>
      <h4>expirationDate: {state.expirationDate}</h4>
      <button onClick={logoutUpdate}>Logout</button>
    </div>
  );
}

export default Home;
