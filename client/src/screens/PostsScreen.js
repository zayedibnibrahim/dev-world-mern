import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postsList } from '../actions/postActions'
import PostCard from '../components/PostCard'

const PostsScreen = () => {
  const dispatch = useDispatch()
  const getPosts = useSelector((state) => state.getPosts)
  const { error, posts, loading } = getPosts

  const likeHandler = () => {}
  const disLikeHandler = () => {}

  useEffect(() => {
    dispatch(postsList())
  }, [])
  return (
    <section className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>

      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form className='form my-1'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            required
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>

      <div className='posts'>
        {posts && posts.length ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              likeHandler={likeHandler}
              disLikeHandler={disLikeHandler}
            />
          ))
        ) : posts && !posts.length ? (
          <p style={{ marginTop: '20px' }}>Sorry no post available</p>
        ) : (
          error && <p style={{ marginTop: '20px' }}>{error}</p>
        )}
      </div>
    </section>
  )
}

export default PostsScreen
