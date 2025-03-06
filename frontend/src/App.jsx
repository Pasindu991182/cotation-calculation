import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import AdminDashboard from "./pages/Admin/AdminDashboard"
import TourPackagePage from "./pages/Admin/TourPackagePage"
import './App.css'
import AddTourForm from "./pages/Admin/AddTourForm"


function App() {
  
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/ADMIN" element={<AdminDashboard />}/>
          <Route path="/tourpackage" element={<TourPackagePage />}/>
          <Route path="/addtour" element={<AddTourForm />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App