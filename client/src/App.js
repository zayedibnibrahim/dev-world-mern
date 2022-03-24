import { Routes, Route } from 'react-router-dom'
import Landing from './screen/Landing'
import Navbar from './components/layout/Navbar'
import Login from './screen/Login'
import Register from './screen/Register'
import './App.css'

const App = () => {
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
