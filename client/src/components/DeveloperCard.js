import React from 'react'
import { Link } from 'react-router-dom'

const DeveloperCard = ({ profile }) => {
  const { user, company, location, status, skills } = profile
  return (
    <div className='profile bg-light'>
      <img className='round-img' src={user?.avatar} alt={user?.name} />
      <div>
        <h2>{user?.name}</h2>
        <p>
          {status && status} at {company && company}
        </p>
        <p>{location && location}</p>
        <Link to={`/profile/${user?._id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {skills &&
          skills.map((skill, index) => (
            <li className='text-primary' key={index + 1}>
              <i className='fas fa-check'></i> {skill}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default DeveloperCard
