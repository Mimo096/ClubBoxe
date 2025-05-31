const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;


// Middleware CORS pour autoriser toutes les origines
app.use(cors());

// Route de test
app.get('/api', (req, res) => {
    console.log('Requête reçue sur /api');
    res.json({ message: 'Bienvenue depuis le backend !' });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Backend démarré sur http://localhost:${PORT}`);
});