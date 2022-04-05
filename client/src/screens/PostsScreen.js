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
import {
  CREATE_POST_RESET,
  SINGLE_POST_RESET,
} from '../constants/postConstants'

const PostsScreen = () => {
  const dispatch = useDispatch()

  const getPosts = useSelector((state) => state.getPosts)
  const { error, posts, loading } = getPosts

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const createPost = useSelector((state) => state.createPost)
  const { success, error: createPostError } = createPost

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
  const [formData, setFormData] = useState({
    text: '',
  })
  const { text } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch({
      type: CREATE_POST_RESET,
    })
    dispatch(postsCreate(text))
  }

  useEffect(() => {
    dispatch(postsList())
    dispatch({
      type: SINGLE_POST_RESET,
    })
    if (success) {
      dispatch({
        type: CREATE_POST_RESET,
      })
      setFormData({ text: '' })
    }
  }, [success, dispatch])

  return (
    <section className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>
      {createPostError && <p>{createPostError}</p>}
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
            onChange={(e) => onChange(e)}
            required
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
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
    </section>
  )
}

export default PostsScreen
