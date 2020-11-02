import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post/Post';
import './PostList.css'

function PostList ({ posts }) {
    return (
      <div style={{marginTop: '24px'}}>
        {posts.map((post, i) => {
            return <Post post={post} key={i} />
          })
        }
      </div>
    )
}

export default PostList;

// PostList.propTypes = {
//   posts: PropTypes.array.isRequired,
//   removeUpdate: PropTypes.func.isRequired
// }
