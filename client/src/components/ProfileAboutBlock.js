import React from 'react'

const ProfileAboutBlock = ({ bio, skills, user }) => {
  return (
    <div className='profile-about bg-light p-2'>
      <h2 className='text-primary'>{user?.name.split(' ')[0]}'s Bio</h2>
      {bio && <p>{bio}</p>}

      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills ? (
          skills.map((skill, index) => (
            <div className='p-1' key={index + 1}>
              <i className='fa fa-check'></i> {skill}
            </div>
          ))
        ) : (
          <div className='p-1'>
            <i className='fa-solid fa-xmark'></i> No Skill Found
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileAboutBlock
