import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Followers from './Followers/Followers';
import Following from './Following/Following';
import './FollowPage.css';

function FollowPage() {

    const [activeItem, setActiveItem] = useState('followers');

    // const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (e, { name }) => setActiveItem(name);

    let currComp;

    if(activeItem === 'followers') currComp = <Followers />;

    if(activeItem === 'following') currComp = <Following />;
    
    return (
        <div className="follow-nav-wrap">
            <Menu pointing secondary size="massive" color="teal">
                <Menu.Item
                    name='followers'
                    className="followers"
                    active={activeItem === 'followers'}
                    onClick={handleItemClick}
                    // as={Link}
                    // to="/dashboard"
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='following'
                        className="following"
                        active={activeItem === 'following'}
                        onClick={handleItemClick}
                        // as={Link}
                        // to="/profile"
                    />
                </Menu.Menu>
            </Menu>
            { currComp }
        </div>
    )

}

export default FollowPage;
