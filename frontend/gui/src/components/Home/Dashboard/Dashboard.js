import React from 'react'
import { posts } from './mypostData/post_data';
import PostList from '../../PostList/PostList';
import './Dashboard.css'
import axios from 'axios';

function Dashboard() {
    // let posts;
    // axios.get('http://127.0.0.1:8000/posts/').then(response=>{
    //     posts = (response.data);
    // }).catch(
    //     error => console.log(error)
    // )
    return (
        <div className="dashboard-wrapper">
            <h1>Dashboard</h1>
            <PostList posts={posts} />
        </div>
    )
}

export default Dashboard
