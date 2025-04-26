import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HotelManagement from "./pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelDashboard.jsx";
import AdminAddHotel from "./pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelAddHotel.jsx";
import AdminUpdateHotel from "./pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelUpdateHotel.jsx";
import AdminTourPackage from "./pages/Admin/AdminDashboard/AdminTourPackageManagement/AdminTourPackage.jsx";
import AddTourForm from "./pages/Admin/AdminDashboard/AdminTourPackageManagement/AddTourForm.jsx";
import UpdateTour from "./pages/Admin/AdminDashboard/AdminTourPackageManagement/UpdateTour.jsx";
import DeleteTour from "./pages/Admin/AdminDashboard/AdminTourPackageManagement/DeleteTour.jsx"
import AdminTransport from './pages/Admin/AdminDashboard/AdminTransportManagement/AdminTransport.jsx'
import AdminAddvehicle from './pages/Admin/AdminDashboard/AdminTransportManagement/AdminvehicleAdd.jsx'
import AdminUpdatevehicle from './pages/Admin/AdminDashboard/AdminTransportManagement/AdminvehicleUpdate.jsx'
import AdminTourGuide from './pages/Admin/AdminDashboard/AdminTourGideManagement/AdminTour.jsx'
import UserHotel from './pages/User/Hotel/Hotel.jsx';
import GuideTable from './pages/Admin/AdminDashboard/AdminTourGideManagement/Tguid.jsx'
import TourCotationCaculation from './pages/User/TourCotationCalculation/TourCotationCaculation.jsx'
import UserHotel from './pages/User/Hotel/Hotel.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/adminHotelManagement", element: <HotelManagement /> },
  { path: "/adminHotelManagement/addHotel", element: <AdminAddHotel /> },
  { path: "/adminTourPackageManagement", element: <AdminTourPackage /> },
  { path: "/adminTourPackageManagement/addTour", element: <AddTourForm /> },
  { path: "/adminTourPackageManagement/updateTour/:id", element: <UpdateTour /> }, // ✅ Fixed dynamic ID in route
  { path: "/adminTourPackageManagement/deleteTour/:id", element: <DeleteTour />},
  { path: "/userHotel",element: <UserHotel />,},
  { path: "/TourCotationCaculation",element: <TourCotationCaculation />,},
  { path: '/hotel-details/:hotelId',element: <AdminUpdateHotel />,},

   
  // ========================= Admin Transport Side =========================
  { path: '/adminTransportManagement', element: <AdminTransport />, },
  { path:'/adminTransportManagement/addvehicle', element:<AdminAddvehicle/> },
  { path:'/adminTransportManagement/updatevehicle', element:<AdminUpdatevehicle/> },

  { path: '/adminTourGuideManagement', element: <AdminTourGuide />, },
  { path: '/GuideT', element: <GuideTable />, },

]);

   


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
