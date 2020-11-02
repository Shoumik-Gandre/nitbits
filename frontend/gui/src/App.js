import React, { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import { useHistory } from "react-router-dom";
import Home from './components/Home/Home';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {

  let history = useHistory();

  const [isLogin, setIsLogin] = useState(true);

  const handleLogIn = () => {
	  setIsLogin(true);
	  history.push(`/dashboard`);
  }

  const handleLogOut = () => {
	  setIsLogin(false);
	  history.push(`/`);
  }

  return (
		<div className="App">
			{
				!isLogin && <LandingPage handleLogIn={handleLogIn} />
			}
			{
				isLogin && <Home handleLogOut={handleLogOut} />
			}
		</div>
  );
}

export default App;
