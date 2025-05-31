import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import memberRoutes from './routes/membresRoutes.js';
import commentRoutes from './routes/commentairesRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Debug from 'debug';
const debug = Debug('my-backend');
import 'dotenv/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

// Middleware
app.use(cors({
    origin: '*', // Autorise toutes les origines
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Middleware pour afficher les requêtes reçues
app.use((req, res, next) => {
    debug(`Requête reçue : ${req.method} ${req.url}`);
    next();
});

// Routes principales
app.get('/api', (req, res) => {
   
});

app.use('/api/admin', adminRoutes); // Routes pour les administrateurs
app.use('/api/members', memberRoutes); // Routes pour les membres
app.use('/api/comments', commentRoutes); // Routes pour les commentaires

console.log('JWT Secret:', process.env.JWT_SECRET);
if (!process.env.JWT_SECRET) {
    console.error("La variable JWT_SECRET n'est pas définie dans le fichier .env");
    process.exit(1); // Arrêtez le serveur si la clé est manquante
}

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});