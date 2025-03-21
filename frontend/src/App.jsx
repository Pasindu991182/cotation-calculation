import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./pages/Admin/AdminDashboard";
import TourPackagePage from "./pages/Admin/TourPackagePage";
import AddTourForm from "./pages/Admin/AddTourForm";
import AdminLayout from "./components/AdminLayout";  // Import AdminLayout
import './App.css';  // Make sure this is included
import backgroundImage from './assets/background.jpg'; // Import image here

function App() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* <Router>
        <Navbar />
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="tourpackage" element={<TourPackagePage />} />
            <Route path="addtour" element={<AddTourForm />} />
          </Route>
        </Routes>
        <Footer />
      </Router> */}
    </div>
  );
}

export default App;
