import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import { useHistory } from "react-router-dom";
import Home from './components/Home/Home';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import axios from 'axios';

function App() {

	let history = useHistory();

	const [isLogin, setIsLogin] = useState((localStorage.getItem('token') ? true : false));
	const [user, setUser] = useState(null)

	useEffect(() => {
        let source = axios.CancelToken.source();

        const loadData = async () => {
            try {
				
                const response = await axios({
					method: 'POST',
					url: `http://127.0.0.1:8000/profiles/getuser/`,
					headers: {
						Authorization: `Token ${localStorage.getItem('token')}`
					}
				});
				setUser({...response.data, token: `Token ${localStorage.getItem('token')}`})
				console.log("user is set")
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("App caught cancel");
                } else {
                    throw err;
                }
            }
		}

        loadData();

        return () => {
            source.cancel();
        };
	}, []);
	
	// useEffect(()=>{
	// 	console.log("Inside APP")
	// 	console.log(user)
	// }, [user])

	const handleLogIn = () => {
		setIsLogin(true);
		history.push(`/dashboard`);
	}

	const handleLogOut = () => {
		const logoutCall = async () => {
			axios.post('http://127.0.0.1:8000/rest-auth/logout/')
				.then(res => { 
					setIsLogin(false); 
					localStorage.removeItem('token');
					setUser({
						username: null,
						image: null,
						token: null,
					});
				})
				.catch(err => console);
		}
		logoutCall();
		history.push(`/`);
	}

	return (
		<div className="App">
			{!isLogin && <LandingPage handleLogIn={handleLogIn} currentUser={user} setCurrentUser={setUser} />}
			{isLogin && <Home handleLogOut={handleLogOut} currentUser={user} setCurrentUser={setUser} />}
		</div>
	);
}

export default App;
