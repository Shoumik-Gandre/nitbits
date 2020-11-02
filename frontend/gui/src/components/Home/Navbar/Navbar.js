import React, { useState, useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Navbar.css';

function Navbar() {

    const pathname = window.location.pathname;

    let path = pathname === '/' ? 'home' : pathname.substr(1);
    
    if(path === 'dashboard') path = 'home';
    if(path === 'surfbits') path = 'surfBits';
    if(path === 'cooknits') path = 'cookNits';
    // console.log(path);
    const [activeItem, setActiveItem] = useState(path);

    // const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
            name='home'
            className="home"
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/dashboard"
            />
            <Menu.Item
            name='surfBits'
            className="surfBits"
            active={activeItem === 'surfBits'}
            onClick={handleItemClick}
            as={Link}
            to="/surfbits"
            />
            <Menu.Item
            name='cookNits'
            className="cookNits"
            active={activeItem === 'cookNits'}
            onClick={handleItemClick}
            as={Link}
            to="/cooknits"
            />
            <Menu.Menu position='right'>
            <Menu.Item
                name='profile'
                className="profile"
                active={activeItem === 'profile'}
                onClick={handleItemClick}
                as={Link}
                to="/profile"
            />
            {/* <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={handleItemClick}
                as={Link}
                to="/logout"
            /> */}
            </Menu.Menu>
        </Menu>
    )

}

export default Navbar;
