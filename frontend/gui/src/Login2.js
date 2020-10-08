import React from "react";
import { useState } from "react";
import axios from "axios";
import { connect } from 'react-redux'
import * as actions from './store/actions/auth';

function Login(props) {

    const [state, setState] = useState({
        "username": "",
        "email": "",
        "password": ""
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

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('expirationDate');
        return {}
    }

    // const checkAuthTimeout = expirationTime => {
    //     return dispatch => {
    //         setTimeout(() => {
    //             dispatch(logout());
    //         }, expirationTime * 1000)
    //     }
    // }

    // function submitHandler(event) {
    //     event.preventDefault();
    //     console.log(axios.post("http://127.0.0.1:8000/rest-auth/login/", state)).then(res=>{
    //         const token = res.data.key;
    //         const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    //         localStorage.setItem('token', token);
    //         localStorage.setItem('expirationDate', expirationDate);
    //         //dispatch(checkAuthTimeout(3600));
    //     });
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAuth(state.username, state.password)
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (<p>{props.error.message}</p>);
    }

    return (
        <div>
            {errorMessage}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} value={state.username}/> <br />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={state.password}/> <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);