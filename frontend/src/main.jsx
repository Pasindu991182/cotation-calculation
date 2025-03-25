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

// Define the router with routes
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/adminHotelManagement", element: <HotelManagement /> },
  { path: "/adminHotelManagement/addHotel", element: <AdminAddHotel /> },
  { path: "/adminHotelManagement/updateHotel", element: <AdminUpdateHotel /> },
  { path: "/adminTourPackageManagement", element: <AdminTourPackage /> },
  { path: "/adminTourPackageManagement/addTour", element: <AddTourForm /> },
  { path: "/adminTourPackageManagement/updateTour/:id", element: <UpdateTour /> }, // ✅ Fixed dynamic ID in route
  { path: "/adminTourPackageManagement/deleteTour/:id", element: <DeleteTour />},
]);

// Render the RouterProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
