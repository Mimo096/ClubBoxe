// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import de Navbar
import Navbar from './components/Navbar'; 
import Footer from './components/Footer' // 
// Import des pages
import HomePage from './pages/HomePage'; 
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegister from './pages/AdminRegister';
import APropos from './pages/APropos';
import Contact from './pages/Contact';
import NosTarifs from './pages/NosTarifs';
import HorairesEntrainement from './pages/HorairesEntrainement';
import './pages/AdminStyles.css'





function App() {
    return (
        <Router>
            <Navbar />
            
            
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/A-propos" element={<APropos />} />
                    <Route path="/Nos-Tarifs" element={<NosTarifs />} />
                    <Route path="/horaires-entrainement" element={<HorairesEntrainement />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/admin/connexion-ultra-secrete-2025" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/register" element={<AdminRegister />} />
                </Routes>
            <Footer />
        </Router>
    );
}


export default App;