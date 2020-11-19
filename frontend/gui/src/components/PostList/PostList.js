import React, {useEffect } from 'react';
import Post from './Post/Post';
import './PostList.css'

function PostList({ posts, currentUser }) {

  const style = ["vcard", "icard", "bcard", "gcard", "ycard", "ocard", "rcard"]

  useEffect(() => {

  }, [posts]);

  return (
    <div style={{ marginTop: '24px' }}>
      {
        posts && posts.map((post, i) => {
          return <Post post={post} key={i} currCard = {style[i % 7]} currentUser={currentUser}/>
        })
      }
    </div>
  )
}

export default PostList;