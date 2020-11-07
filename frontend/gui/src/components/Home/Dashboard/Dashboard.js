import React, {useState} from 'react'
import { posts } from './mypostData/post_data';
import PostList from '../../PostList/PostList';
import './Dashboard.css'
import axios from 'axios';
import { useEffect } from 'react';


function Dashboard() {

    //const [posts, setPosts] = useState(null);

    useEffect(async () => {
        const res = await axios.get('http://127.0.0.1:8000/posts/')
        //setPosts(res.data);
        console.log("res", res.data);
    }, [posts]);

    return (
        <div className="dashboard-wrapper">
            <h1>Dashboard</h1>
            <PostList posts={posts} />
        </div>
    )
}

export default Dashboard
