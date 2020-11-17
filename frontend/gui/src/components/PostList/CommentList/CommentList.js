import React, { useState, useEffect } from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import avatarImg from '../../../static/images/img_01.jpeg';
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
    margin: `2px ${theme.spacing(2)}px 2px 2px`
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
  }
}))

function CommentList({ user, comments, post }) {

  const classes = useStyles()
  const [text, setText] = useState('')

  const handleChange = event => {
    setText(event.target.value)
  }


  const addComment = (event) => {
    // add comment api
    console.log("Add comment");

    axios({
      method: 'POST',
      url: `http://127.0.0.1:8000/posts/${post.pk}/comments/create/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: {
        'post_pk': post.pk,
        'description': text,
      }
    })
      .then(res => {
        console.log(res)
      })
  }


  const deleteComment = (comment) => {
    // delete comment api
    console.log('delete comment');
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
          <Avatar className={classes.smallAvatar} src={avatarImg} />
        }
        title={
          <div>
            <TextField
              // onKeyDown={addComment}
              multiline
              value={text}
              onChange={handleChange}
              placeholder="Write something ..."
              className={classes.commentField}
              margin="normal"
            />
            <button onClick={addComment}>post</button>
          </div>
        }
        className={classes.cardHeader}
      />
      {
        comments.map((comment, i) => {
          return (
            <div>
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.smallAvatar}
                    src={comment.owner.profile.image}
                  />
                }
                title={commentBody(comment)}
                className={classes.cardHeader}
                key={i}
              />
              {user.username === comment.owner.username ? <button>delete</button> : null}
            </div>
          )
        })
      }
    </div>
  );
}

export default CommentList;

