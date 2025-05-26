import React from 'react';
import gantsBoxe from '../assets/image5.jpg';
import './style/NosTarifs.css';

const NosTarifs = () => {
  return (
    <div
      className="page-tarifs"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${gantsBoxe})`,
      }}
    >
      <h1 className="tarifs-title">Tarifs</h1>

      <div className="tarif-card">

        {/* Adhésion */}
        <div className="tarif-section">
          <h2>📋 Adhésion & Licence :</h2>
          <ul>
            <li>🌟 Frais d'adhésion (valable 1 an) : XX €</li>
            <li>🥊 Licence fédérale (obligatoire pour la pratique et l’assurance) : XX €</li>
          </ul>
        </div>

        {/* Abonnements */}
        <div className="tarif-section">
          <h2>🏷️ Formules & Abonnements :</h2>
          <div className="tarif-table-wrapper">
            <table className="tarif-table">
              <thead>
                <tr>
                  <th>Formule</th>
                  <th>Mensuel</th>
                  <th>Trimestriel</th>
                  <th>Annuel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🟢 Boxe Loisir</td>
                  <td>XX €</td>
                  <td>XX €</td>
                  <td>XX €</td>
                </tr>
                <tr>
                  <td>🥇 Boxe Compétition</td>
                  <td>XX €</td>
                  <td>XX €</td>
                  <td>XX €</td>
                </tr>
                <tr>
                  <td>💪 Cardio-Boxe</td>
                  <td>XX €</td>
                  <td>XX €</td>
                  <td>XX €</td>
                </tr>
                <tr>
                  <td>🧒 Boxe Éducative (enfants)</td>
                  <td>XX €</td>
                  <td>XX €</td>
                  <td>XX €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Séances à l'unité */}
        <div className="tarif-section">
          <h2>🎯 Séances à l’unité :</h2>
          <ul>
            <li>💥 Cours découverte (1ère séance) : <strong>Gratuit</strong></li>
            <li>🎯 Séance à l’unité : XX €</li>
            <li>🥊 Pack 10 séances : XX €</li>
          </ul>
        </div>

      </div>
      <div className="tarif-image">
  <img src={gantsBoxe} alt="gants de boxe" />
</div>

    </div>
    
  );
};

export default NosTarifs;
