import { Routes, Route } from 'react-router-dom'
import Landing from './screens/Landing'
import Navbar from './components/layout/Navbar'
import Login from './screens/Login'
import Register from './screens/Register'
import './App.css'
import Dashboard from './screens/Dashboard'
import PrivateOutlet from './components/layout/PrivateOutlet'
import CreateProfile from './screens/CreateProfile'
import EditProfile from './screens/EditProfile'
import AddExperienceScreen from './screens/AddExperienceScreen'
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
        <Route path='/*' element={<PrivateOutlet />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='create-profile' element={<CreateProfile />} />
          <Route path='edit-profile' element={<EditProfile />} />
          <Route path='add-experience' element={<AddExperienceScreen />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
