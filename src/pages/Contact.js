import React from 'react';
import './style/ContactPage.css';
import deuxboxer from '../assets/image4.jpg';

function Contact() {
  return (
    <div className="contact-page">

      {/* Contenu principal */}
      <div className="content-wrapper">
        <h1 className="contact-title">Nous Contacter</h1>

        <div className="contact-info">
          <p className="contact-item">
            <strong>Email :</strong> rsboxeparis@gmail.com
          </p>
          <p className="contact-item">
            <strong>Téléphone 1 :</strong> 06 18 14 02 04
          </p>
          <p className="contact-item">
            <strong>Téléphone 2 :</strong> 06 26 09 71 24 
          </p>
        </div>
      </div>

      {/* Image en bas */}
      <div className="image-container">
        <img src={deuxboxer} alt="Ring de boxe" className="boxing-image" />
      </div>

    </div>
  );
}

export default Contact;