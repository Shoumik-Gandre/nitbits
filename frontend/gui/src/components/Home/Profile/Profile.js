import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import avatarImg from '../../../static/images/img_01.jpeg';
import userDefault from '../../../static/images/user-default.jpg';
//import postImg from '../../../static/images/img_00.jpeg'
import { one_post_data } from './onePostData/one_post_data';
import PostList from '../../PostList/PostList';
import './Profile.css'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    largeAvatar: {
        width: 150,
        height: 150,
        margin: "auto",
    },
    profileHeaderWrap: {
        marginBottom: "40px",
    },
    profileInfoWrap: {
        textAlign: "left",
    },
    userInfoWrap: {
        marginTop: "20px",
    },
    postSetWrap: {
        marginTop: "30px",
    },
    photo: {
        textAlign: 'center',
        backgroundColor: 'rgb(28 37 35)',
        padding: theme.spacing(1)
    },
    media: {
        height: 200
    },
}))

function Profile({ match }) {

    const classes = useStyles();

    const [normal, setNormal] = useState(true);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let source = axios.CancelToken.source();

        const loadData = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: `http://127.0.0.1:8000/posts/userprofile/`,
                    headers: {
                        "content-type": "multipart/form-data",
                        "Authorization": `Token ${localStorage.getItem('token')}`
                    }
                });
                setPosts(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {console.log("dashboard caught cancel");} 
                else {throw err;}
            }
        }

        loadData();

        return () => {
            source.cancel();
        };
    }, []);

    const handleMyPostDescription = () => {
        // redirect to /post
        
        setNormal(!normal);
    }

    let currComp;

    if (normal) {
        currComp = (
            <div className={classes.postSetWrap}>
                <Grid container spacing={6}>
                    {
                        posts.map((post, id) => {
                            return (
                                <Grid item xs={5} sm={4}>
                                    <div className={classes.photo} onClick={handleMyPostDescription} >
                                        <img
                                            className={classes.media}
                                            src={post.image}
                                            alt='alt'
                                        />
                                    </div>
                                </Grid>
                            )
                        })
                    }
                    {/* <Grid item xs={5} sm={4}>
                        <div className={classes.photo} onClick={handleMyPostDescription} >
                            <img
                            className={classes.media}
                            src={postImg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={5} sm={4} >
                        <div className={classes.photo} onClick={handleMyPostDescription} >
                            <img
                            className={classes.media}
                            src={avatarImg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={5} sm={4} >
                        <div className={classes.photo} onClick={handleMyPostDescription}>
                            <img
                            className={classes.media}
                            src={postImg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={5} sm={4} >
                        <div className={classes.photo} onClick={handleMyPostDescription}>
                            <img
                            className={classes.media}
                            src={avatarImg}
                            />
                        </div>
                    </Grid> */}
                </Grid>
            </div>
        )
    }
    else {
        currComp = (
            <div>
                <div className="back-btn">
                    <p onClick={handleMyPostDescription}>Back</p>
                </div>
                <div className="post-description-wrapper">
                    <PostList posts={one_post_data} />
                </div>
            </div>
        )
    }

    useEffect(() => {
        console.log(match.params.userName);
    }, [match.params.userName])

    return (
        <div className="profile-wrapper">
            <h1>Profile</h1>
            <div className={classes.profileHeaderWrap}>
                <Grid container spacing={8}>
                    <Grid item xs={4} sm={3}>
                        <Avatar className={classes.largeAvatar} src={avatarImg} />
                    </Grid>
                    <Grid className={classes.profileInfoWrap} item xs={10} sm={9}>
                        {/* <button>Follow</button> */}
                        <h3>rajat</h3>
                        <p> Software Developer </p>
                        <Grid className={classes.userInfoWrap} container spacing={6}>
                            <Grid item xs={5} sm={4}>
                                <h3 className="user-attr-count">4</h3>
                                <h3 className="user-attr-name">Posts</h3>
                            </Grid>
                            <Grid className={classes.profileInfoWrap} item xs={5} sm={4}>
                                <h3 className="user-attr-count">10</h3>
                                <h3 className="user-attr-name">Followers</h3>
                            </Grid>
                            <Grid className={classes.profileInfoWrap} item xs={5} sm={4}>
                                <h3 className="user-attr-count">15</h3>
                                <h3 className="user-attr-name">Following</h3>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Divider />
            <hr></hr>
            { currComp}
        </div>
    )
}

export default Profile
