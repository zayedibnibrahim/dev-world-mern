import React from 'react'
import Moment from 'react-moment'

const ExperienceCatalog = ({ experiences, experienceDeleteHandler }) => {
  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp, index) => (
            <tr key={index + 1}>
              <td>{exp.company}</td>
              <td className='hide-sm'>{exp.title}</td>
              <td className='hide-sm'>
                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{' '}
                {exp.to ? <Moment format='DD/MM/YYYY'>{exp.to}</Moment> : 'Now'}
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => experienceDeleteHandler(exp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ExperienceCatalog
