import React, {useState} from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import avatarImg from '../../../static/images/img_01.jpeg';
import './CommentList.css';

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

function CommentList ({ user, comments }) {

  const classes = useStyles()
  const [text, setText] = useState('')

  const handleChange = event => {
    setText(event.target.value)
  }

//   const addComment = (event) => {
//     if(event.keyCode == 13 && event.target.value){
//       event.preventDefault()
//       comment({
//         userId: jwt.user._id
//       }, {
//         t: jwt.token
//       }, props.postId, {text: text}).then((data) => {
//         if (data.error) {
//           console.log(data.error)
//         } else {
//           setText('')
//           props.updateComments(data.comments)
//         }
//       })
//     }
//   }

  const addComment = (event) => {
    // add comment api
  }

//   const deleteComment = comment => event => {
//     uncomment({
//       userId: jwt.user._id
//     }, {
//       t: jwt.token
//     }, props.postId, comment).then((data) => {
//       if (data.error) {
//         console.log(data.error)
//       } else {
//         props.updateComments(data.comments)
//       }
//     })
//   }

    const deleteComment = (comment) => {
        // delete comment api
    }

    const commentBody = comment => {
      return (
        <p className={classes.commentText}>
          <Link to={"/user/" + comment.owner}>{ comment.owner }</Link><br/>
          { comment.description }
          <span className={classes.commentDate}>
            {(new Date(comment.timestamp)).toDateString()} |
            {user.username === comment.owner &&
              <Icon onClick={deleteComment(comment)} className={classes.commentDelete}>delete</Icon> }
          </span>
        </p>
      )
    }

    return (<div>
        <CardHeader
              avatar={
                // <Avatar className={classes.smallAvatar} src={'/api/users/photo/'+auth.isAuthenticated().user._id}/>
                <Avatar className={classes.smallAvatar} src={ avatarImg }/>
              }
              title={ <TextField
                onKeyDown={addComment}
                multiline
                value={text}
                onChange={handleChange}
                placeholder="Write something ..."
                className={classes.commentField}
                margin="normal"
                />}
              className={classes.cardHeader}
        />
        { comments.map((comment, i) => {
            return <CardHeader
                      avatar={
                        // <Avatar className={classes.smallAvatar} src={'/api/users/photo/'+item.postedBy._id}/>
                        <Avatar className={classes.smallAvatar} src={ avatarImg }/>
                      }
                      title={commentBody(comment)}
                      className={classes.cardHeader}
                      key={i}/>
              })
        }
    </div>)
}

export default CommentList;


// Comments.propTypes = {
//   postId: PropTypes.string.isRequired,
//   comments: PropTypes.array.isRequired,
//   updateComments: PropTypes.func.isRequired
// }
