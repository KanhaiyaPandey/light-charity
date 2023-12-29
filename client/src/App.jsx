import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from "./pages/Register"
import Login from './pages/Login'
import { DonorLoginAction, DonorRegisterAction, DonorRegisterVerificationAction } from './utils/actions'
import Landing from './pages/Landing'
import DonorDashbord from './pages/DonorDashbord'
import { DonordashboardLoader } from './utils/loaders'
import Error from "./pages/Error"
import { HomeLayout } from './pages/HomeLayout'
import RegisterVerify from './pages/RegisterVerify'


const router = createBrowserRouter([
  
  {
         path: "/",
         element: <HomeLayout/>,
         errorElement: <Error/>,
         children: [

          {
            index: true,
            element: <Landing/>
          },

          {
            path: "donor/register",
            element: <Register/>,
            action:DonorRegisterAction,
          },

          {
            path: "donor/login",
            element: <Login/>,
            action: DonorLoginAction,
          },

          {
            path:"donor/register/verification",
            element:<RegisterVerify/>,
            action: DonorRegisterVerificationAction,
          },

          {
              path: "donor/dashboard",
              element: <DonorDashbord/>,
              loader: DonordashboardLoader,
          }

         ]
  },

 

])








const App = () => {
  return (
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App
