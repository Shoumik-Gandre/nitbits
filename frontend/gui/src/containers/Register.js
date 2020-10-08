import React, { useState } from "react";
import axios from "axios";

function Register(props) {

  const [state, setState] = useState({
    username: "",
    email: "",
    password1: "",
    password2: ""
  });

  function handleChange(event) {
      const {name, value} = event.target;
      setState((prevValue)=>{
          return {
              ...prevValue,
              [name]: value
          }
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submit register');
      // event.preventDefault();
      // console.log(axios.post("http://127.0.0.1:8000/rest-auth/registration/", state)).then(res=>{
      //     const token = res.data.key;
      //     const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      //     localStorage.setItem('token', token);
      //     localStorage.setItem('expirationDate', expirationDate);
      // });
  }

  return (
  <div>
    Register Page
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="username" 
        placeholder="Username" 
        onChange={handleChange} 
        value={state.username}
      /> <br />
      <input 
        type="text" 
        name="email" 
        placeholder="Email" 
        onChange={handleChange} 
        value={state.email}
      /> <br />
      <input 
        type="password" 
        name="password1" 
        placeholder="Password" 
        onChange={handleChange} 
        value={state.password1}
      /> <br />
      <input 
        type="password" 
        name="password2" 
        placeholder="Confirm Password" 
        onChange={handleChange} 
        value={state.password2}
      /> <br />
      <button type="submit">Register</button>
    </form>
  </div>
  );
}

export default Register;