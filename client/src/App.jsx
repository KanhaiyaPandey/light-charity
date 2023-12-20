import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from "./pages/Register"
import Login from './pages/Login'
import { RegisterAction } from './utils/actions'


const router = createBrowserRouter([
  

  {
    path: "/register",
    element: <Register/>,
    action: RegisterAction,

  },

  {
    path: "/login",
    element: <Login/>,

  },

])








const App = () => {
  return (
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App
