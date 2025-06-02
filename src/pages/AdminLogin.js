import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // État pour le loader
    const navigate = useNavigate();

    // Validation du formulaire
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Veuillez entrer un email valide.");
            return false;
        }
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return false;
        }
        return true;
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true); // Active le loader

        if (!validateForm()) {
            setIsLoading(false); // Désactive le loader en cas d'erreur
            return;
        }

        try {
            console.log('Envoi des identifiants à l\'API', { email, password });
            const response = await fetch('http://localhost:4000/api/admin/very-secure-path/login-admin-2025', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la connexion');
            }

            const data = await response.json();
            
            localStorage.setItem('adminToken', data.token) ; // Stocke le token JWT
            localStorage.setItem('adminId', data.adminId); // Stockez l'ID ici
            localStorage.setItem('role', 'admin');


            navigate('/admin/dashboard'); // Redirige vers le tableau de bord
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false); // Désactive le loader
        }
    };

    return (
        
        <div className="login-container">
            <h2>Connexion Administrateur</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="input-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
            </form>
        </div>
    
    );
}

export default AdminLogin;