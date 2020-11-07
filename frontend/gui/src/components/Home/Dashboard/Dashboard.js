import React, { useState } from 'react'
// import { posts } from './mypostData/post_data';
import PostList from '../../PostList/PostList';
import './Dashboard.css'
import axios from 'axios';
import { useEffect } from 'react';

function Dashboard() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let source = axios.CancelToken.source();

        const loadData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/posts/`,
                    {
                        cancelToken: source.token,
                    }
                );
                console.log(response.data);
                setPosts(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("dashboard caught cancel");
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


    return (
        <div className="dashboard-wrapper">
            <h1>Dashboard</h1>
            <PostList posts={posts} />
        </div>
    )
}

export default Dashboard
