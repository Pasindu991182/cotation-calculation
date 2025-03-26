import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import HotelManagement from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelDashboard.jsx'
import AdminAddHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelAddHotel.jsx'
import AdminUpdateHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelUpdateHotel.jsx'
import AdminTransport from './pages/Admin/AdminDashboard/AdminTransportManagement/AdminTransport.jsx'
import AdminAddvehicle from './pages/Admin/AdminDashboard/AdminTransportManagement/AdminvehicleAdd.jsx'
import AdminUpdatevehicle from './pages/Admin/AdminDashboard/AdminTransportManagement/AdminvehicleUpdate.jsx'


import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
   // ======================== Client  Side=====================
   {
    path: "/",
    element: <App />,
  },
   // ========================= Admin  Side =========================
   
   {
      path: '/adminHotelManagement',
      element: <HotelManagement />,
   },

   {
      path: '/adminHotelManagement/addHotel',
      element: <AdminAddHotel />,
   },
   {
    path: '/adminHotelManagement/updateHotel',
    element: <AdminUpdateHotel />,
 },
   
 // ========================= Admin Transport Side =========================
 {
   path: '/adminTransportManagement',
   element: <AdminTransport />,
},

{
   path:'/adminTransportManagement/addvehicle',
   element:<AdminAddvehicle/>
},

{
   path:'/adminTransportManagement/updatevehicle',
   element:<AdminUpdatevehicle/>
},







])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
