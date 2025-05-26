import React from 'react';
import './style/HorairesPage.css';
import deuxboxer from '../assets/image4.jpg';

function HorairesEntrainement() {
  const horaires = [
    { jour: "Lundi", heures: "17h00 - 20h00" },
    { jour: "Mardi", heures: "17h00 - 20h00" },
    { jour: "Mercredi", heures: "17h00 - 20h00" },
    { jour: "Jeudi", heures: "Fermé" },
    { jour: "Vendredi", heures: "17h00 - 18h30" },
    { jour: "Samedi", heures: "Fermé" },
    { jour: "Dimanche", heures: "Fermé (ouvert de temps en temps de 16h00 à 18h00)" },
    { jour: "Jours fériés", heures: "Fermé" },
  ];

  return (
    <div className="horaires-page">
      {/* Contenu centré */}
      <div className="content-wrapper">
        <h1 className="horaires-title">Horaires d’entraînement</h1>

        <div className="horaires-table">
          {horaires.map((item, index) => (
            <div className="horaire-row" key={index}>
              <div className="jour">{item.jour}</div>
              <div className="heures">{item.heures}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Image full-width */}
      <div className="image-container">
        <img src={deuxboxer} alt="Ring de boxe" className="boxing-image" />
      </div>
    </div>
  );
}

export default HorairesEntrainement;