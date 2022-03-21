import { Routes, Route } from 'react-router-dom'
import Landing from './Screen/Landing'
import Navbar from './components/layout/Navbar'
import Login from './Screen/Login'
import Register from './Screen/Register'
import './App.css'

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
