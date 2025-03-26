import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import HotelManagement from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelDashboard.jsx'
import AdminAddHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelAddHotel.jsx'
import AdminUpdateHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelUpdateHotel.jsx'
import TourCotationCaculation from './pages/User/TourCotationCalculation/TourCotationCaculation.jsx'
import UserHotel from './pages/User/Hotel/Hotel.jsx'
import TourGide from './pages/Admin/AdminDashboard/AdminTourGideManagement/AdminTour.jsx';
import TourGideAdd from './pages/Admin/AdminDashboard/AdminTourGideManagement/AdminTourGide.jsx';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
   // ======================== Client  Side=====================
   {
    path: "/",
    element: <App />,
  },

  {
   path: "/userHotel",
   element: <UserHotel />,
 },
 {
  path: "/TourCotationCaculation",
  element: <TourCotationCaculation />,
},

   // ========================= Admin  Side =========================
   
   {
      path: '/adminHotelManagement',
      element: <HotelManagement />,
   },
   {
    path: '/TourGide',
    element: <TourGide />,
 },
 {
  path: '/TourGideAdd',
  element: <TourGideAdd />,
},
 

   {
      path: '/adminHotelManagement/addHotel',
      element: <AdminAddHotel />,
   },
   {
    path: '/hotel-details/:hotelId',
    element: <AdminUpdateHotel />,
 },
   

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
