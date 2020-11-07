import React from 'react'
import Navbar from './Navbar/Navbar';
import { Container } from 'semantic-ui-react'
import Dashboard from './Dashboard/Dashboard';
import SurfBits from './SurfBits/SurfBits';
import CookNits from './CookNits/CookNits';
import Profile from './Profile/Profile';
import { Route } from 'react-router-dom';
import './Home.css'

function Home({ handleLogOut }) {
    return (
        <Container>
            <div>
                <div className="header-title">Nitbits <h3 onClick={handleLogOut} className="logout-title">Logout</h3> </div>
            </div>
            <Navbar />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/surfnits" component={SurfBits} />
            <Route exact path="/cooknits" component={CookNits} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user/:userName" component={Profile} />
        </Container>
    )
}

export default Home
