import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
      path:"login",
      element:<Login/>
    },
    
    {
      path:"register",
      element:<Register/>
    }
  ]
    
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
