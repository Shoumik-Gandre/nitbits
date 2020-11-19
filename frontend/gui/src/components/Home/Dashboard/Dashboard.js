import React, { useState } from 'react'
// import { posts } from './mypostData/post_data';
import PostList from '../../PostList/PostList';
import './Dashboard.css'
import axios from 'axios';
import { useEffect } from 'react';

function Dashboard({ currentUser, setCurrentUser }) {

    const [posts, setPosts] = useState([]);

    // useEffect(()=>{
    //     console.log("Inside Dashboard")
    //     console.log(currentUser);
    // }, [currentUser])

    useEffect(() => {
        if (!currentUser){
            let source = axios.CancelToken.source();

            const loadData = async () => {
                try {
                    const response = await axios({
                        method: 'POST',
                        url: `http://127.0.0.1:8000/profiles/getuser/`,
                        headers: {Authorization: `Token ${localStorage.getItem('token')}`}
                    });
                    setCurrentUser({...response.data, token: `Token ${localStorage.getItem('token')}`})
                    console.log("user is set")
                } catch (err) {if (axios.isCancel(err)) {console.log("App caught cancel");} else {throw err;}}
            }
            loadData();
            return () => {
                source.cancel();
            };
        }
	}, []);

    useEffect(() => {
        let source = axios.CancelToken.source();

        const loadData = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `http://127.0.0.1:8000/posts/home/`,
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                });
                // console.log(response.data);
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
            <h1>Home</h1>
            <PostList posts={posts} currentUser={currentUser}/>
        </div>
    )
}

export default Dashboard
