
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      </ul>
    </nav>
  );
}

export default Navbar;
