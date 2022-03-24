import { Routes, Route } from 'react-router-dom'
import Landing from './screen/Landing'
import Navbar from './components/layout/Navbar'
import Login from './screen/Login'
import Register from './screen/Register'
import './App.css'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { loadUser } from './actions/authActions'

const App = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (localStorage.getItem('userInfo')) {
  //     dispatch(loadUser())
  //   }
  // }, [])
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
