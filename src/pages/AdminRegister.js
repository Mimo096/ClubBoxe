import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/AdminRegister.css';

function AdminRegister() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Nouvel état pour le message de succès
    const navigate = useNavigate();

    // Fonction de validation des données
    const validateForm = () => {
        const { email, password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Veuillez entrer un email valide.");
            return false;
        }

        if (password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return false;
        }

        setError(''); // Réinitialise les erreurs si tout est valide
        return true;
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Valide les données avant de les envoyer
        if (!validateForm()) {
            return;
        }

        try {
            console.log("Données envoyées :", {
                email: formData.email,
                mot_de_passe_hash: formData.password,
            });

            const response = await fetch('http://localhost:4000/api/admin/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    mot_de_passe_hash: formData.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erreur lors de l'inscription.");
            }

            // Affiche un message de succès
            setSuccessMessage("Inscription réussie ! Veuillez vous connecter.");
            setError(''); // Réinitialise les erreurs

            // Redirige vers la page de connexion après 3 secondes
            setTimeout(() => {
                navigate('/admin/login');
            }, 3000); // Redirection après 3 secondes
        } catch (err) {
            console.error(err);
            setError(err.message || "Une erreur est survenue lors de l'inscription.");
        }
    };

    return (
        <div className="register-container">
            <h1>Inscription Administrateur</h1>
            {/* Affiche le message d'erreur */}
            {error && <p className="error-message">{error}</p>}
            {/* Affiche le message de succès */}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="form-container">
            <input
    type="email"
    placeholder="Email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    required
    autoComplete="email" // Ajoutez cet attribut
/>
<input
    type="password"
    placeholder="Mot de passe"
    value={formData.password}
    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    required
    autoComplete="new-password" // Ajoutez cet attribut
/>
<input
    type="password"
    placeholder="Confirmer le mot de passe"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
    autoComplete="new-password" // Ajoutez cet attribut
/>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default AdminRegister;