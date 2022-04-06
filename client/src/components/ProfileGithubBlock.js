import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { githubRepoFetch } from '../actions/profileActions'
import { FETCH_GITHUB_RESET } from '../constants/profileConstants'

const ProfileGithubBlock = ({ githubusername }) => {
  const dispatch = useDispatch()

  const fetchGithub = useSelector((state) => state.fetchGithub)
  const { gitInfo, error } = fetchGithub

  useEffect(() => {
    dispatch({ type: FETCH_GITHUB_RESET })
    if (githubusername && githubusername !== '') {
      dispatch(githubRepoFetch(githubusername))
    }
  }, [githubusername])

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {gitInfo && gitInfo.length !== 0
        ? gitInfo.map((git) => (
            <div className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a
                    href={git.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {git.name}
                  </a>
                </h4>
                {git.description && <p>{git.description}</p>}
              </div>
              <div>
                <ul>
                  <li className='badge badge-primary'>
                    Stars: {git.forks && git.forks}
                  </li>
                  <li className='badge badge-dark'>
                    Watchers: {git.watchers && git.watchers}
                  </li>
                  <li className='badge badge-light'>
                    Forks: {git.forks && git.forks}
                  </li>
                </ul>
              </div>
            </div>
          ))
        : error && <p>{error}</p>}
    </div>
  )
}

export default ProfileGithubBlock
