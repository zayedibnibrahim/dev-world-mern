import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import PrivateOutlet from './components/layout/PrivateOutlet'
import CreateProfileScreen from './screens/CreateProfileScreen'
import AddExperienceScreen from './screens/AddExperienceScreen'
import AddEducationScreen from './screens/AddEducationScreen'
import DevelopersScreen from './screens/DevelopersScreen'
import ProfileScreen from './screens/ProfileScreen'
import DashboardScreen from './screens/DashboardScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import PostsScreen from './screens/PostsScreen'
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
        <Route path='/' element={<HomeScreen />} />
        <Route path='login' element={<LoginScreen />} />
        <Route path='register' element={<RegisterScreen />} />
        <Route path='developers' element={<DevelopersScreen />} />
        <Route path='profile/:id' element={<ProfileScreen />} />
        <Route path='/*' element={<PrivateOutlet />}>
          <Route path='dashboard' element={<DashboardScreen />} />
          <Route path='create-profile' element={<CreateProfileScreen />} />
          <Route path='edit-profile' element={<EditProfileScreen />} />
          <Route path='add-experience' element={<AddExperienceScreen />} />
          <Route path='add-education' element={<AddEducationScreen />} />
          <Route path='posts' element={<PostsScreen />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
