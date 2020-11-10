import React from 'react';
import Post from './Post/Post';
import './PostList.css'

function PostList({ posts }) {

  const style = ["vcard", "icard", "bcard", "gcard", "ycard", "ocard", "rcard"]

  return (
    <div style={{ marginTop: '24px' }}>
      {
        posts && posts.map((post, i) => {
          return <Post post={post} key={i} currCard = {style[i % 7]}/>
        })
      }
    </div>
  )
}

export default PostList;