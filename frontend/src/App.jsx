import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./pages/Admin/AdminDashboard";
import TourPackagePage from "./pages/Admin/TourPackagePage";
import AddTourForm from "./pages/Admin/AddTourForm";
import AdminLayout from "./components/AdminLayout";  // Import AdminLayout
// import './App.css';
import backgroundImage from './assets/background.jpg';

function App() {
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',  // Centers the background image
      backgroundSize: 'contain',     // Makes the image smaller, adjust as needed
      backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      height: '100vh'                // Ensures the background covers the entire viewport
    }}>
      <Router>
        <Navbar />
        <Routes>
          {/* Admin Pages wrapped in AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="tourpackage" element={<TourPackagePage />} />
            <Route path="addtour" element={<AddTourForm />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
