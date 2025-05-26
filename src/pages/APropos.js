import React from 'react';
import './style/AProposPage.css';
import deuxboxer from '../assets/image4.jpg'; // Tu peux changer l’image si tu veux

function APropos() {
  return (
    <div className="apropos-page">
      {/* Contenu principal */}
      <div className="content-wrapper">
        <h1 className="apropos-title">À propos de RS Boxe</h1>

        <p className="club-description">
          RS Boxe est bien plus qu’un simple club de boxe : c’est une véritable communauté où passion, dépassement de soi et convivialité se rencontrent. Que vous soyez débutant ou boxeur expérimenté, notre équipe de coachs diplômés vous accompagne dans votre progression, que ce soit pour le loisir, la compétition ou la remise en forme.
        </p>

        <h2 className="section-title">Nos disciplines</h2>
        <ul className="disciplines-list">
          <li>🥊 <strong>Boxe anglaise</strong> – La discipline reine, alliant technique et stratégie.</li>
          <li>🥊 <strong>Boxe éducative</strong> – Idéale pour les jeunes, elle permet d’apprendre en toute sécurité.</li>
          <li>ROIDGE <strong>Cardio-boxe</strong> – Une séance intense pour brûler un maximum de calories tout en s’amusant.</li>
          <li>ROIDGE <strong>Préparation physique</strong> – Pour améliorer votre condition physique et vos performances.</li>
        </ul>

        <h2 className="section-title">Pourquoi choisir RS Boxe ?</h2>
        <ul className="avantages-list">
          <li>✅ <strong>Encadrement professionnel</strong> – Des entraîneurs expérimentés et passionnés.</li>
          <li>✅ <strong>Ambiance conviviale</strong> – Un club familial où l'entraide et le respect sont essentiels.</li>
          <li>✅ <strong>Équipements modernes</strong> – Une salle équipée pour une pratique optimale.</li>
          <li>✅ <strong>Suivi personnalisé</strong> – Des conseils adaptés à vos objectifs.</li>
        </ul>

        <h2 className="section-title">Rejoignez-nous !</h2>
        <p className="club-cta">
          Que vous souhaitiez apprendre à boxer, vous remettre en forme ou préparer une compétition, RS Boxe vous accueille toute l’année. Venez tester un cours et découvrir l’énergie unique de notre club !
        </p>
      </div>

      {/* Image en bas */}
      <div className="image-container">
        <img src={deuxboxer} alt="Ring de boxe" className="boxing-image" />
      </div>
    </div>
  );
}

export default APropos;