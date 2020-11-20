import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import userDefault from '../../../../../static/images/user-default.jpg';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Followers.css';

function Followers({ match }) {

	let targetUser = match.params.userName;
	console.log(targetUser);

	const [followers, setFollowers] = useState([]);

    const handleFollowers = async() => {
        try {		
            const response = await axios({
                method: 'POST',
                url: `http://127.0.0.1:8000/profiles/userfollowed/${match.params.userName}/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            setFollowers(response.data);
        } catch (err) {
            console.log("handleFollowers: ", err);
        }
    }

	const handleRemove = async(e) => {
		console.log("force unfollow to ", match.params.userName);
		console.log("from ", e.target.id);
		// need new unfollow api
		let uploadData = new FormData();
		uploadData.append('user1', e.target.id);
		uploadData.append('user2', match.params.userName);
        const response = await axios.post(
            `http://127.0.0.1:8000/profiles/newunfollow/`,
            uploadData,
            {
                headers: {
                    ...axios.defaults.headers,
                    "content-type": "multipart/form-data",
                    "Authorization": `Token ${localStorage.getItem('token')}`,
                },
            }
        );
        console.log("remove response : ", response.data)
		handleFollowers();
	}

	useEffect(() => {
        let source = axios.CancelToken.source();

        const loadData = async () => {
            try {
				
                const response = await axios({
					method: 'POST',
					url: `http://127.0.0.1:8000/profiles/userfollowed/${match.params.userName}/`,
					headers: {
						Authorization: `Token ${localStorage.getItem('token')}`
					}
				});
                setFollowers(response.data);
                console.log("followers arr : ", response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("App caught cancel");
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
        <div>
            <h1> Followers </h1>
			{
                followers && followers.map((f, id) => {
                    return (
                        <div>
                            <Card className="follower-card-wrap">
                                <Grid container spacing={8}>
                                    <Grid item xs={2} sm={2}>
                                        <CardHeader
                                            avatar={
                                                // <Avatar src={`http://127.0.0.1:8000${post.owner.profile.image}`} />
                                                <Avatar src={userDefault} />
                                            }
                                        />
                                    </Grid>
                                    <Grid className="follower-info" item xs={7} sm={7}>
                                        <div className="follower-info-wrap">
                                        <p className="follower-info-username">{<Link to={"/user/" + f}>{f}</Link>}</p>
                                            <p className="follower-info-description">Software Developer</p>
                                        </div>
                                    </Grid>
                                    <Grid className="follower-action" item xs={2} sm={3}>
                                        <button id={f} onClick={handleRemove} className="follower-action-btn">Remove</button>
                                    </Grid>
                                </Grid>
                            </Card>
                            <Divider />
                        </div>
                    )
                })
            }
            {/* <Card className="follower-card-wrap">
				<Grid container spacing={8}>
					<Grid item xs={2} sm={2}>
						<CardHeader
							avatar={
                                // <Avatar src={`http://127.0.0.1:8000${post.owner.profile.image}`} />
                                <Avatar src={userDefault} />
							}
							// action={post.owner.username === user.username &&
							// 	<IconButton onClick={deletePost}>
							// 		<DeleteIcon className={classes.deleteBtn} />
							// 	</IconButton>
							// }
							// title={<Link to={"/user/" + post.owner.username}>{post.owner.username}</Link>}
							// subheader={(new Date(post.timestamp)).toDateString()}
							// className={classes.cardHeader}
						/>
					</Grid>
                    <Grid className="follower-info" item xs={7} sm={7}>
                        <div className="follower-info-wrap">
                            <p className="follower-info-username">{<Link to={"/user/" + "abc"}>abc</Link>}</p>
                            <p className="follower-info-description">Software Developer</p>
                        </div>
					</Grid>
					<Grid className="follower-action" item xs={2} sm={3}>
						<button id="abc" onClick={handleRemove} className="follower-action-btn">Remove</button>
					</Grid>
				</Grid>
			</Card>
            <Divider />
            <Card className="follower-card-wrap">
				<Grid container spacing={8}>
					<Grid item xs={2} sm={2}>
						<CardHeader
							avatar={
                                // <Avatar src={`http://127.0.0.1:8000${post.owner.profile.image}`} />
                                <Avatar src={userDefault} />
							}
							// action={post.owner.username === user.username &&
							// 	<IconButton onClick={deletePost}>
							// 		<DeleteIcon className={classes.deleteBtn} />
							// 	</IconButton>
							// }
							// title={<Link to={"/user/" + post.owner.username}>{post.owner.username}</Link>}
							// subheader={(new Date(post.timestamp)).toDateString()}
							// className={classes.cardHeader}
						/>
					</Grid>
                    <Grid className="follower-info" item xs={7} sm={7}>
                        <div className="follower-info-wrap">
                            <p className="follower-info-username">{<Link to={"/user/" + "cde"}>cde</Link>}</p>
                            <p className="follower-info-description">Software Developer</p>
                        </div>
					</Grid>
					<Grid className="follower-action" item xs={2} sm={3}>
						<button id="cde" onClick={handleRemove} className="follower-action-btn">Remove</button>
					</Grid>
				</Grid>
			</Card> */}
        </div>
    )
}

export default Followers
