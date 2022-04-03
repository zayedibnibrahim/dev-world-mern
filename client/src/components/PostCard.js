import React from 'react'
import Moment from 'react-moment'

const PostCard = ({ post, likeHandler, disLikeHandler }) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img className='round-img' src={post.avatar} alt='' />
          <h4>{post.name}</h4>
        </a>
      </div>
      <div>
        <p className='my-1'>{post.posttext}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{post.data}</Moment>
        </p>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => likeHandler(post._id)}
        >
          <i className='fas fa-thumbs-up'></i>
          <span>{post.likes?.length}</span>
        </button>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => disLikeHandler(post._id)}
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <a href='post.html' className='btn btn-primary'>
          Discussion{' '}
          <span className='comment-count'>{post.comments?.length}</span>
        </a>
        <button type='button' className='btn btn-danger'>
          <i className='fas fa-times'></i>
        </button>
      </div>
    </div>
  )
}

export default PostCard
