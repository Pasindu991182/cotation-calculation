import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.jsx';
import HotelManagement from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelDashboard.jsx';
import AdminAddHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelAddHotel.jsx';
import AdminUpdateHotel from './pages/Admin/AdminDashboard/AdminHotelManagement/AdminHotelUpdateHotel.jsx';
import TourCotationCaculation from './pages/User/TourCotationCalculation/TourCotationCaculation.jsx';
import UserHotel from './pages/User/Hotel/Hotel.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // React Router
 // Import AnimatePresence from Framer Motion  // Import the Transition component

const AppRoutes = () => (
  <Router>
    
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/userHotel" element={<UserHotel />} />
        <Route path="/TourCotationCaculation" element={<TourCotationCaculation />} />
        <Route path="/adminHotelManagement" element={<HotelManagement />} />
        <Route path="/adminHotelManagement/addHotel" element={ <AdminAddHotel/>} />
        <Route path="/hotel-details/:hotelId" element={<AdminUpdateHotel />} />
      </Routes>
    
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
