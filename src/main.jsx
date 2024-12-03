import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Compo/Home.jsx';
import AddUser from './Compo/AddUser.jsx';
import UpdateUser from './Compo/UpdateUser.jsx';
import AuthProvider from './AuthContext/AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("https://my-user-management.vercel.app/users")
      },
      {
        path: "/addUser",
        element: <AddUser></AddUser>
      },
      {
        path: "/updateUser/:id",
        element: <UpdateUser></UpdateUser>,
        loader:({params}) => fetch(`https://my-user-management.vercel.app/users/${params.id}`)
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
