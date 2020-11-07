import React from 'react';
import Post from './Post/Post';
import './PostList.css'

function PostList({ posts }) {
  console.log(posts);
  return (
    <div style={{ marginTop: '24px' }}>
      {
        posts && posts.map((post, i) => {
          return <Post post={post} key={i} />
        })
      }
    </div>
  )
}

export default PostList;