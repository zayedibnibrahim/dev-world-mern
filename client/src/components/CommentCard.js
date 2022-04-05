import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const CommentCard = ({ comment, userInfo, deleteCommentHandler, postId }) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${comment.user}`}>
          <img className='round-img' src={comment.avatar} alt={comment.name} />
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{comment.text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{comment.date}</Moment>
        </p>
        {userInfo?._id === comment?.user && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => deleteCommentHandler(postId, comment._id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  )
}

export default CommentCard
