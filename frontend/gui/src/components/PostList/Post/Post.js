import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import CommentList from '../CommentList/CommentList';
import { user } from './post_data';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import postDefault from "../../../static/images/post-default.jpg";
import axios from 'axios';
import './Post.css';
let cc, bcc;

// const [currColor, setCurrColor] = useState(null);
// const [currBorderColor, setBorderColor] = useState(null);

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 1200,
		// maxHeight:700,
		margin: 'auto',
		marginBottom: theme.spacing(3),
		// backgroundColor: 'black',
		// backgroundColor: cc,
		// border: bcc,
		color: 'rgb(134 133 126) !important',
	},
	vcard: {
		backgroundColor: 'rgba(238, 130, 238, 0.2)',
		border: '2px solid rgba(238, 130, 238, 1)',
	},
	cardContent: {
		backgroundColor: 'rgb(24 26 27)',
		padding: `${theme.spacing(2)}px 0px`
	},
	cardHeader: {
		color: 'rgb(134 133 126) !important',
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	text: {
		margin: theme.spacing(2)
	},
	photo: {
		textAlign: 'center',
		backgroundColor: 'rgb(28 37 35)',
		padding: theme.spacing(1)
	},
	media: {
		height: 200
	},
	button: {
		margin: theme.spacing(1),
	},
	commentIcon: {
		margin: theme.spacing(1),
		color: "grey",
	},
	deleteBtn: {
		color: "grey",
	}
}))

function Post({ post, c, bc, currCard }) {

	cc = c;
	bcc = bc;

	const classes = useStyles()

	// 0 => no vote, 1 => positive vote, -1 => negative vote
	const [upvoteState, setUpvoteState] = useState(post.user_vote === 1);
	const [downvoteState, setDownVoteState] = useState(post.user_vote === -1);
	const [totalVote, setTotalVote] = useState(post.get_votes);

	const toggleUpvoteState = () => {
		if(!upvoteState) setDownVoteState(false);
		setUpvoteState(!upvoteState);
	}

	const toggleDownVoteState = () => {
		if(!downvoteState) setUpvoteState(false);
		setDownVoteState(!downvoteState);
	}

	const clickUpvote = () => {

		toggleUpvoteState();
		let vote_ = 0;
		// console.log("us", upvoteState);
		if(!upvoteState) vote_ = 1;

		axios({
			method: "post",
			url: `http://127.0.0.1:8000/posts/vote/`,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Token ${localStorage.getItem('token')}`,
			},
			data: {
				'vote': vote_,
				'post_pk': post.pk
			}
		})
		.then((response) => {
			console.log(response);
			// Change the number of votes and user_vote on this post
			// CODE HERE
		})
		.catch(error => {console.log(error)});
	}

	const clickDownvote = () => {

		toggleDownVoteState();
		let vote_ = 0;
		// console.log("ds", downvoteState);
		if(!downvoteState) vote_ = -1;

		axios({
			method: "post",
			url: `http://127.0.0.1:8000/posts/vote/`,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Token ${localStorage.getItem('token')}`,
			},
			data: {
				'vote': vote_,
				'post_pk': post.pk
			}
		}).then(response=> {
			console.log(response);
			// Change the number of votes and user_vote on this post
			// CODE HERE
		});
	}

	//const updateComments = () => {update comments api}

	const deletePost = () => {
		/*delete post api*/ 
		axios({
			method: "DELETE",
			url: `http://127.0.0.1:8000/posts/${post.pk}/delete/`,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Token ${localStorage.getItem('token')}`,
			},
		}).then(response=> {
			console.log(response);
			// REMOVE THE POST
			// CODE HERE
		});
	}

	useEffect(() => {

		cc = c;
		bcc = bc;

		let source = axios.CancelToken.source();

        const loadData = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: `http://127.0.0.1:8000/posts/${post.pk}/`,
                    headers: {
                        "content-type": "multipart/form-data",
                        "Authorization": `Token ${localStorage.getItem('token')}`
                    }
				});
				// console.log("user post : ", response.data.get_votes);
				setTotalVote(response.data.get_votes);
            } catch (err) {
                if (axios.isCancel(err)) {console.log("post caught cancel");} 
                else {throw err;}
            }
        }

        loadData();

        return () => {
            source.cancel();
        };
	}, [useStyles, upvoteState, downvoteState, totalVote]);

	return (
		<div>
			<div className="vote-icons-wrapper">
				{
					upvoteState && <div onClick={clickUpvote}><BiUpvote className="upvote-icon" /></div>
				}
				{
					!upvoteState && <div onClick={clickUpvote}><BiUpvote className="normal-icon" /></div>
				}
				<div className="vote-count">{ totalVote }</div>
				{
					downvoteState && <div onClick={clickDownvote}><BiDownvote className="downvote-icon" /></div>
				}
				{
					!downvoteState && <div onClick={clickDownvote}><BiDownvote className="normal-icon" /></div>
				}
			</div>
			<Card className={`${currCard} ${classes.card}`}>
				<Grid container spacing={8}>
					<Grid item xs={8} sm={7}>
						<CardHeader
							avatar={
								<Avatar src={`${post.owner.profile.image}`} />
							}
							action={post.owner.username === user.username &&
								<IconButton onClick={deletePost}>
									<DeleteIcon className={classes.deleteBtn} />
								</IconButton>
							}
							title={<Link to={"/user/" + post.owner.username}>{post.owner.username}</Link>}
							subheader={(new Date(post.timestamp)).toDateString()}
							className={classes.cardHeader}
						/>
						<CardContent className={classes.cardContent}>
							<Typography component="p" className={classes.text}>
								{post.description}
							</Typography>
							{post.image &&
								(<div className={classes.photo}>
									<img
										className={classes.media}
										src={`${post.image}`}
										alt="alt"
									/>
								</div>)}
							{!post.image &&
								(<div className={classes.photo}>
									<img
										className={classes.media}
										src={postDefault}
										alt="alt"
									/>
								</div>)}
						</CardContent>
						<CardActions>
							<IconButton className={classes.commentIcon} aria-label="Comment" color="secondary">
								<CommentIcon />
							</IconButton> <span>{post.comments.length ? 1 : 0}</span>
						</CardActions>
					</Grid>
					<Grid className="comments-wrap" item xs={6} sm={5}>
						<CommentList user={user} comments={post.comments} post={post} />
					</Grid>
				</Grid>
				<Divider />
			</Card>
		</div>
	)

}

export default Post;
