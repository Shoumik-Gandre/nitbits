import React from 'react'
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
import './Post.css';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 1200,
    // maxHeight:700,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    color: 'rgb(134 133 126) !important'
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

function Post({ post }) {
  const classes = useStyles()

  //const clickLike = () => {like api}

  //const updateComments = () => {update comments api}

  const deletePost = () => {/*delete post api*/ }

  console.log(post);

  return (
    <div>
      <div className="vote-icons-wrapper">
        <div><BiUpvote className="upvote-icon" /></div>
        <div className="vote-count">1.2K</div>
        <div><BiDownvote className="downvote-icon" /></div>
      </div>
      <Card className={classes.card}>
        <Grid container spacing={8}>
          <Grid item xs={8} sm={7}>
            <CardHeader
              avatar={
                // <Avatar src={'/api/users/photo/'+post.owner}/>
                <Avatar src={post.owner.profile.image} />
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
                    src={post.image}
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
            <CommentList user={user} comments={post.comments} />
          </Grid>
        </Grid>
        <Divider />
      </Card>
    </div>
  )

}

export default Post;
