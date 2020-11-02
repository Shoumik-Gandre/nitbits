import React from 'react'
import { posts } from './mypostData/post_data';
import PostList from '../../PostList/PostList';
import './Dashboard.css'

function Dashboard() {
    return (
        <div className="dashboard-wrapper">
            <h1>Dashboard</h1>
            <PostList posts={posts} />
        </div>
    )
}

export default Dashboard
