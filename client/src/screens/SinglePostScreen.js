import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { singlePostGet } from '../actions/postActions'
import CommentCard from '../components/CommentCard'
import Spinner from '../components/Spinner'

const SinglePostScreen = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const singlePost = useSelector((state) => state.singlePost)
  const { error, post, loading } = singlePost

  const deleteCommentHandler = (postId, commentId) => {
    console.log(postId, commentId)
  }

  useEffect(() => {
    dispatch(singlePostGet(params.id))
  }, [params, dispatch])
  return (
    <section className='container'>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <div className='post bg-white p-1 my-1'>
        <div>
          <a href='profile.html'>
            <img className='round-img' src={post?.avatar} alt={post?.name} />
            <h4>{post?.name}</h4>
          </a>
        </div>
        <div>
          <p className='my-1'>{post?.text}</p>
        </div>
      </div>

      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Leave A Comment</h3>
        </div>
        <form className='form my-1'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Comment on this post'
            required
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
      <div className='comments'>
        {loading && <Spinner />}
        {post && post.comments && post.comments.length ? (
          post.comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              userInfo={userInfo}
              deleteCommentHandler={deleteCommentHandler}
              postId={post?._id}
            />
          ))
        ) : (
          <p style={{ marginTop: '20px' }}>No Comment</p>
        )}
      </div>
    </section>
  )
}

export default SinglePostScreen
