import React from 'react'
import Moment from 'react-moment'

const EducationCatalog = ({ educations, educationDeleteHandler }) => {
  return (
    <>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((edu, index) => (
            <tr key={index + 1}>
              <td>{edu.school}</td>
              <td className='hide-sm'>{edu.degree}</td>
              <td className='hide-sm'>
                <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
                {edu.to ? <Moment format='DD/MM/YYYY'>{edu.to}</Moment> : 'Now'}
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => educationDeleteHandler(edu._id)}
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

export default EducationCatalog
