import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from "./pages/Register"
import Login from './pages/Login'
import { RegisterAction } from './utils/actions'
import Landing from './pages/Landing'
import DonorDashbord from './pages/DonorsPages/DonorDashbord'


const router = createBrowserRouter([
  
  {
         path: "/",
         element: <Landing/>
  },

  {
     path: "donor/dashboard",
     element: <DonorDashbord/>,
     children: [],
  },
  {
    path: "/donor/register",
    element: <Register/>,
    action: RegisterAction,
  },
  {
    path: "/donor/login",
    element: <Login/>
  }


])








const App = () => {
  return (
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App
