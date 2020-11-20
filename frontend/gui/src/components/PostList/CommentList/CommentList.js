import React, { useState, useEffect } from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import avatarImg from '../../../static/images/img_01.jpeg';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
import './CommentList.css';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: '96%',
    color: 'grey'
  },
  commentText: {
    backgroundColor: 'rgb(22, 30, 28)',
    padding: theme.spacing(1),
    // margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
  },
  commentDelete: {
    fontSize: '1.6em',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
	deleteBtn: {
		color: "grey",
	}
}))

function CommentList({ user, comments, post, currentUser, setCurrentUser, handlePosts }) {

  const classes = useStyles()
  const [text, setText] = useState('')
  const [commentState, setCommentState] = useState(comments);

  // useEffect(()=>{
  //   console.log("inside comment list")
  //   console.log(currentUser);
  // }, [currentUser])

  const handleChange = event => {
    setText(event.target.value)
  }


  const addComment = (event) => {
    // add comment api
    // setText(event.target.value)

    if(event.key === 'Enter'){
      console.log('enter press here! ')
      axios({
        method: 'POST',
        url: `http://127.0.0.1:8000/posts/${post.pk}/comments/create/`,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        data: {
          'post_pk': post.pk,
          'description': event.target.value,
        }
      })
        .then(res => {
          setText("");
          handlePosts();
          // setCommentState(commentState)
        })
      return false;
    }

    // axios({
    //   method: 'POST',
    //   url: `http://127.0.0.1:8000/posts/${post.pk}/comments/create/`,
    //   headers: {
    //     Authorization: `Token ${localStorage.getItem('token')}`,
    //     'Content-Type': 'application/json'
    //   },
    //   data: {
    //     'post_pk': post.pk,
    //     'description': text,
    //   }
    // })
    //   .then(res => {
    //     setText("");
    //     handlePosts();
    //     // setCommentState(commentState)
    //   })
  }


  const deleteComment = (d_pk) => {
    // delete comment api
    // setCommentState(commentState.filter(obj => {return obj.pk !== comment_pk}))
    // console.log("delete comment ", e.target.id);
    axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/posts/comments/${d_pk}/delete/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: {}
    })
      .then(res => {
        console.log(res);
        // comments.push(res.data);
        setText("")
        handlePosts();
      })
  }

  const commentBody = comment => {
    return (
      <p className={classes.commentText}>
        <Link to={"/user/" + comment.owner.username}>{comment.owner.username}</Link><br />
        { comment.comment}
        <span className={classes.commentDate}>
          {(new Date(comment.timestamp)).toDateString()} |
          {user.username === comment.owner.username &&
            <Icon onClick={deleteComment(comment)} className={classes.commentDelete}>delete</Icon>}
        </span>
      </p>
    )
  }

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar className={classes.smallAvatar} src={currentUser?currentUser.image:avatarImg} />
        }
        title={
          <div>
            <TextField
              // onKeyDown={addComment}
              multiline
              value={text}
              onChange={handleChange}
              onKeyPress={addComment}
              placeholder="Add Comment ..."
              className={classes.commentField}
              margin="normal"
            />
            {/* <Button
                color="primary"
                variant="contained"
                onClick={addComment}
                className={classes.submit}
            >
            post
            </Button> */}
          </div>
        }
        className={classes.cardHeader}
      />
      {
        comments.map((comment, i) => {
          return (
            <Grid container >
                <Grid item xs={13} sm={11}>
                <CardHeader
                avatar={<Avatar className={classes.smallAvatar} src={comment.owner.profile.image}/>}
                title={commentBody(comment)}
                className={classes.cardHeader}
                key={i}
              />
                </Grid>
                <Grid item xs={1} sm={1}>
                {currentUser.username === comment.owner.username &&
              (
              <IconButton>
									<div id={comment.pk} onClick={() => {deleteComment(comment.pk)}}>
                    <DeleteIcon className={classes.deleteBtn} />
                  </div>
							</IconButton>
              )
              }
                </Grid>
            </Grid>
            // <div>
            //   <CardHeader
            //     avatar={<Avatar className={classes.smallAvatar} src={comment.owner.profile.image}/>}
            //     title={commentBody(comment)}
            //     className={classes.cardHeader}
            //     key={i}
            //   />
            //   {currentUser.username === comment.owner.username &&
            //   (
            //   <IconButton>
						// 			<div id={comment.pk} onClick={() => {deleteComment(comment.pk)}}>
            //         <DeleteIcon className={classes.deleteBtn} />
            //       </div>
						// 	</IconButton>
            //   )
            //   }
            // </div>
          )
        })
      }
    </div>
  );
}

export default CommentList;

