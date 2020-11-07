import React, { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import { useHistory } from "react-router-dom";
import Home from './components/Home/Home';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import axios from 'axios';

function App() {

	let history = useHistory();

	const [isLogin, setIsLogin] = useState((localStorage.getItem('token') ? true : false));

	const handleLogIn = () => {
		setIsLogin(true);
		history.push(`/dashboard`);
	}

	const handleLogOut = () => {
		const logoutCall = async () => {
			axios.post('http://127.0.0.1:8000/rest-auth/logout/')
				.then(res => { setIsLogin(false); localStorage.removeItem('token'); })
				.catch(err => console);
		}
		logoutCall();
		history.push(`/`);
	}

	return (
		<div className="App">
			{!isLogin && <LandingPage handleLogIn={handleLogIn} />}
			{isLogin && <Home handleLogOut={handleLogOut} />}
		</div>
	);
}

export default App;
