
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Vérifie le rôle dès que le composant s'affiche
  useEffect(() => {
    const role = localStorage.getItem('role');
     console.log('Rôle détecté :', role); //
    if (role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // ou seulement localStorage.removeItem('token') selon ta logique
    navigate('/admin/connexion-ultra-secrete-2025'); // redirige vers la page de connexion
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo du site" className="logo-image" />
        </Link>

        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/A-propos" onClick={() => setMenuOpen(false)}>À propos</Link></li>
        <li><Link to="/Nos-Tarifs" onClick={() => setMenuOpen(false)}>Nos Tarifs</Link></li>
        <li><Link to="/horaires-entrainement" onClick={() => setMenuOpen(false)}>Horaires d'entraînement</Link></li>
        <li><Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

        {isAdmin && (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Déconnexion
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
