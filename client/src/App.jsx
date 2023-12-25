import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from "./pages/Register"
import Login from './pages/Login'
import { DonorLoginAction, DonorRegisterAction } from './utils/actions'
import Landing from './pages/Landing'
import DonorDashbord from './pages/DonorsPages/DonorDashbord'
import { DonordashboardLoader } from './utils/loaders'
import Error from "./pages/Error"
import { HomeLayout } from './pages/HomeLayout'


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
