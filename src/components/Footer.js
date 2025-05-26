
import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Assure-toi que le chemin est correct

function Footer() {
  return (
    <footer className="footer">
      <div className="nav-links">
        <a href="/">Accueil</a>
        <a href="/about">À propos</a>
        <a href="/contact">Contact</a>
       
      </div>

      <div className="social-icons">
        <a href="https://www.facebook.com/RsBoxe/" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FaInstagram />
        </a>
      </div>

      <p>&copy; {new Date().getFullYear()} Red Star. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;
