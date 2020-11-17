import React from 'react';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import userDefault from '../../../../../static/images/user-default.jpg';
import './Followers.css';

function Followers() {
    return (
        <div>
            <h1> Followers </h1>
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
                            <p className="follower-info-username">r7j7t</p>
                            <p className="follower-info-description">Software Developer</p>
                        </div>
					</Grid>
					<Grid className="follower-action" item xs={2} sm={3}>
						<button className="follower-action-btn">Following</button>
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
                            <p className="follower-info-username">r7j7t</p>
                            <p className="follower-info-description">Software Developer</p>
                        </div>
					</Grid>
					<Grid className="follower-action" item xs={2} sm={3}>
						<button className="follower-action-btn">Following</button>
					</Grid>
				</Grid>
			</Card>
        </div>
    )
}

export default Followers
