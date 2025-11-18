import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import { Outlet, Route, Routes } from 'react-router-dom'
import Loginpage from './Pages/Loginpage'
import Registerpage from './Pages/Registerpage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Routes>
      <Route path='login' element={Loginpage}/>
      <Route path='register' element={Registerpage}/>
      

    </Routes> */}
     
  <Navbar/>
  <Outlet/>
       
    </>
  )
}

export default App
