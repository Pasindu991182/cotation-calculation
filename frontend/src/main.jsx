import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import HotelManagement from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelDashboard.jsx'
import AdminAddHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelAddHotel.jsx'
import AdminUpdateHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelUpdateHotel.jsx'
//mport AddTourGuide from './pages/Admin/AdminDashboard/AdminTourGideManagement/AddTourGuide.jsx'
import AdminTourGuide from './pages/Admin/AdminDashboard/AdminTourGideManagement/AdminTour.jsx'
import UserHotel from './pages/User/Hotel/Hotel.jsx';
import GuideTable from './pages/Admin/AdminDashboard/AdminTourGideManagement/Tguid.jsx'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
   // ======================== Client  Side=====================
   {
    path: "/",
    element: <App />,
  },
  {
   path: "/UserHotel",
   element: <UserHotel />,
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

    // ======================== Admin Tour Guide Side=====================
     
       {/*path: '/adminTourGuideManagement/addTourGuide',
      element: <AddTourGuide />,*/},
   

  
       {path: '/adminTourGuideManagement',
      element: <AdminTourGuide />, },
  

   {
      path: '/GuideT',
      element: <GuideTable />,
   },



])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
