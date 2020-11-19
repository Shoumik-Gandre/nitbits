import React, { useEffect } from 'react'
import Navbar from './Navbar/Navbar';
import { Container } from 'semantic-ui-react'
import Dashboard from './Dashboard/Dashboard';
import SurfBits from './SurfBits/SurfBits';
import CookNits from './CookNits/CookNits';
import Profile from './Profile/Profile';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './Home.css'

function Home({ handleLogOut, currentUser, setCurrentUser }) {

    // useEffect(()=>{
    //     console.log("Inside Home")
    //     console.log(currentUser);
    // }, [currentUser])

    useEffect(()=> {
        if (currentUser && currentUser.username === null){
            const loadData = async () => {
                
                try {
                    const response = await axios({
                        method: 'POST',
                        url: `http://127.0.0.1:8000/profiles/getuser/`,
                        headers: {Authorization: `Token ${localStorage.getItem('token')}`}
                    });
                    setCurrentUser({...response.data, token: `Token ${localStorage.getItem('token')}`})
                } catch (err) {
                    if (axios.isCancel(err)) {
                        console.log("App caught cancel");
                    } else {
                        throw err;
                    }
                }
            }
            loadData();
        }
    })
    
    return (
        <Container>
            <div>
                <h1 className="header-title">Nitbits </h1>
                <h3 onClick={handleLogOut} className="logout-title">Logout</h3>
            </div>
            <Navbar />
            <Route exact path="/dashboard" render={(props) => <Dashboard {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route exact path="/surfnits" render={(props) => <SurfBits {...props} currentUser={currentUser} />} />
            <Route exact path="/cooknits" render={(props) => <CookNits {...props} currentUser={currentUser} />} />
            <Route exact path="/profile" component={Profile}/>
            <Route path="/user/:userName" component={Profile}/>
        </Container>
    )
}

export default Home
