import React from 'react'
import spinner from '../img/Fidget-spinner.gif'
const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        alt='Loading....'
        style={{ width: '200px', display: 'block', margin: 'auto' }}
      />
    </>
  )
}

export default Spinner
