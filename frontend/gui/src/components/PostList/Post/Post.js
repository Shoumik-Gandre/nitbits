import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
// import Comments from './Comments'
import CommentList from '../CommentList/CommentList';
import avatarImg from '../../../static/images/img_01.jpeg';
import postImg from '../../../static/images/img_00.jpeg';
import { user } from './post_data';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import './Post.css';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth:1200,
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
    padding:theme.spacing(1)
  },
  media: {
    height: 200
  },
  button: {
   margin: theme.spacing(1),
  },
  commentIcon:{
    margin: theme.spacing(1),
    color: "grey",
  },
  deleteBtn: {
    color: "grey",
  }
}))

function Post ({ post }){
  const classes = useStyles()

  // const jwt = auth.isAuthenticated()
  // const checkLike = (likes) => {
  //   let match = likes.indexOf(jwt.user._id) !== -1
  //   return match
  // }

  // const [values, setValues] = useState({
  //   like: checkLike(props.post.likes),
  //   likes: props.post.likes.length,
  //   comments: props.post.comments
  // })
  
  // useEffect(() => {
  //   setValues({...values, like:checkLike(props.post.likes), likes: props.post.likes.length, comments: props.post.comments})
  // }, [])

  

  // const clickLike = () => {
  //   let callApi = values.like ? unlike : like
  //   callApi({
  //     userId: jwt.user._id
  //   }, {
  //     t: jwt.token
  //   }, props.post._id).then((data) => {
  //     if (data.error) {
  //       console.log(data.error)
  //     } else {
  //       setValues({...values, like: !values.like, likes: data.likes.length})
  //     }
  //   })
  // }

  const clickLike = () => {
    // like api
  }

  // const updateComments = (comments) => {
  //   setValues({...values, comments: comments})
  // }

  const updateComments = () => {
    // update comments api
  }

  // const deletePost = () => {   
  //   remove({
  //     postId: props.post._id
  //   }, {
  //     t: jwt.token
  //   }).then((data) => {
  //     if (data.error) {
  //       console.log(data.error)
  //     } else {
  //       props.onRemove(props.post)
  //     }
  //   })
  // }

    const deletePost = () => {
      // delete post api
    }

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
                <Avatar src={ avatarImg }/>
              }
              action={post.owner === user.username &&
                <IconButton onClick={deletePost}>
                  <DeleteIcon className={classes.deleteBtn} />
                </IconButton>
              }
              title={<Link to={"/user/" + post.owner}>{post.owner}</Link>}
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
                  // src={'/api/posts/photo/'+post.image}
                  src={postImg}
                  />
              </div>)}
          </CardContent>
          <CardActions>
            {/* { post.num_upvotes
              ? <IconButton onClick={clickLike} className={classes.button} aria-label="Like" color="secondary">
                  <FavoriteIcon />
                </IconButton>
              : <IconButton onClick={clickLike} className={classes.button} aria-label="Unlike" color="secondary">
                  <FavoriteBorderIcon />
                </IconButton> } <span>{post.num_upvotes}</span> */}
                <IconButton className={classes.commentIcon} aria-label="Comment" color="secondary">
                  <CommentIcon/>
                </IconButton> <span>{post.num_comments}</span>
          </CardActions>
            </Grid>
            <Grid className="comments-wrap" item xs={6} sm={5}>
              <CommentList user={user} comments={post.comments} />
            </Grid>
        </Grid>
        <Divider/>
        
        {/* <CardHeader
            avatar={
              // <Avatar src={'/api/users/photo/'+post.owner}/>
              <Avatar src={ avatarImg }/>
            }
            action={post.owner === user.username &&
              <IconButton onClick={deletePost}>
                <DeleteIcon />
              </IconButton>
            }
            title={<Link to={"/user/" + post.owner}>{post.owner}</Link>}
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
                // src={'/api/posts/photo/'+post.image}
                src={postImg}
                />
            </div>)}
        </CardContent>
        <CardActions>
          { post.num_upvotes
            ? <IconButton onClick={clickLike} className={classes.button} aria-label="Like" color="secondary">
                <FavoriteIcon />
              </IconButton>
            : <IconButton onClick={clickLike} className={classes.button} aria-label="Unlike" color="secondary">
                <FavoriteBorderIcon />
              </IconButton> } <span>{post.num_upvotes}</span>
              <IconButton className={classes.button} aria-label="Comment" color="secondary">
                <CommentIcon/>
              </IconButton> <span>{post.num_comments}</span>
        </CardActions>
        <CommentList user={user} comments={post.comments} />
        <Divider/> */}
        {/* <Comments postId={props.post._id} comments={values.comments} updateComments={updateComments}/> */}
      </Card>
      </div>
    )
  
}

// Post.propTypes = {
//   post: PropTypes.object.isRequired,
//   onRemove: PropTypes.func.isRequired
// }

export default Post;
