import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  likeRemove,
  likeUpdate,
  postDelete,
  postsCreate,
  postsList,
} from '../actions/postActions'
import PostCard from '../components/PostCard'
import Spinner from '../components/Spinner'
import { SINGLE_POST_RESET } from '../constants/postConstants'

const PostsScreen = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const getPosts = useSelector((state) => state.getPosts)
  const { error, posts, loading } = getPosts

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const likeHandler = (id) => {
    dispatch(likeUpdate(id))
  }
  const disLikeHandler = (id) => {
    dispatch(likeRemove(id))
  }
  const deleteHandler = (id) => {
    dispatch(postDelete(id))
  }

  //create a post

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(postsCreate(text))
    setText('')
  }

  useEffect(() => {
    dispatch(postsList())
    dispatch({
      type: SINGLE_POST_RESET,
    })
  }, [])

  return (
    <section className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the community!
          </p>
          {error && <p>{error}</p>}
          <div className='post-form'>
            <div className='bg-primary p'>
              <h3>Say Something...</h3>
            </div>

            <form className='form my-1' onSubmit={onSubmit}>
              <textarea
                name='text'
                cols='30'
                rows='5'
                placeholder='Create a post'
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
              <input
                type='submit'
                className='btn btn-dark my-1'
                value='Submit'
              />
            </form>
          </div>

          <div className='posts'>
            {posts && posts.length
              ? posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    likeHandler={likeHandler}
                    disLikeHandler={disLikeHandler}
                    userInfo={userInfo}
                    deleteHandler={deleteHandler}
                  />
                ))
              : posts &&
                !posts.length && (
                  <p style={{ marginTop: '20px' }}>Sorry no post available</p>
                )}
          </div>
        </>
      )}
    </section>
  )
}

export default PostsScreen
