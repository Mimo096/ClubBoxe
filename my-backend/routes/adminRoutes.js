console.log("Chargement de adminRoutes.js");
import express from 'express';
import db from '../database.js';
import { addAdmin } from '../models/admin.js'; // Importer les fonctions du modèle Admin
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import verifyAdmin from '../middlewares/authMiddleware.js'
const router = express.Router();

// 1. Récupérer tous les administrateurs
router.get('/',  (req, res) => {
    const query = 'SELECT id, email FROM administrateurs';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des administrateurs :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});



// 2. Ajouter un nouvel administrateur
router.post('/', (req, res) => {
    const { email, mot_de_passe_hash } = req.body;

    if (!email || !mot_de_passe_hash) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }

    addAdmin(email,mot_de_passe_hash, (err, adminId) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'administrateur :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(201).json({
            message: 'Administrateur ajouté avec succès',
            id: adminId,
        });
    });
});

 //Route pour la connexion de l'administrateur//

 router.post('/very-secure-path/login-admin-2025', async (req, res) => {
     const { email, password } = req.body;
 
     // Vérifiez que les champs email et mot de passe sont fournis
     if (!email || !password) {
         return res.status(400).json({ error: 'Email et mot de passe sont requis' });
     }
 
     try {
         // Recherche de l'administrateur par email
         const [results] = await db.query('SELECT * FROM administrateurs WHERE email = ?', [email]);
 
         // Vérifiez si un administrateur a été trouvé
         if (!results || results.length === 0) {
             return res.status(401).json({ error: 'Identifiants invalides' });
         }
 
         const admin = results[0];
 
         // Vérifiez si le mot de passe est correct
         const isPasswordValid = await bcrypt.compare(password, admin.mot_de_passe_hash);
 
         if (!isPasswordValid) {
             return res.status(401).json({ error: 'Identifiants invalides' });
         }
 
         // Générez un token JWT
         const token = jwt.sign(
             { id: admin.id, role: 'admin' }, // Données à inclure dans le token
             process.env.JWT_SECRET, // Clé secrète pour signer le token
             { expiresIn: '1h' } // Durée de validité du token
         );
 
         // Réponse réussie avec le token
         res.json({ message: 'Connexion réussie', token,adminId: admin.id      });
     } catch (err) {
         console.error("Erreur lors de la connexion :", err);
         res.status(500).json({ error: 'Erreur serveur' });
     }
 });

// 4. Route pour l'inscription des administrateurs
router.post('/register', (req, res) => {
    console.log("Route /register appelée");
    const { email, mot_de_passe_hash } = req.body;

    if (!email || !mot_de_passe_hash) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }

    // Vérifier si l'administrateur existe déjà
    db.query('SELECT * FROM administrateurs WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'email :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Ajouter le nouvel administrateur
        addAdmin(email, mot_de_passe_hash, (err, adminId) => {
            if (err) {
                console.error('Erreur lors de l\'ajout de l\'administrateur :', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(201).json({
                message: 'Inscription réussie',
                id: adminId,
            });
        });
    });
});
router.get('/test', (req, res) => {
    res.json({ message: 'Route test réussie !' });
});

// route pour ajoute un membres // 

router.post('/members', verifyAdmin, async (req, res) => {
    console.log('Requête reçue pour /admin/members');
    console.log('Données reçues :', req.body);
    const { prenom, nom, email, telephone, statut_paiement, note } = req.body;

    console.log('Données reçues pour /admin/members :', req.body);

    // Validation des champs obligatoires
    if (!prenom || typeof prenom !== 'string' || prenom.trim() === '') {
        return res.status(400).json({ error: 'Le prénom est requis et doit être une chaîne de caractères.' });
    }
    if (!nom || typeof nom !== 'string' || nom.trim() === '') {
        return res.status(400).json({ error: 'Le nom est requis et doit être une chaîne de caractères.' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'L\'email est requis et doit être valide.' });
    }
    if (!telephone || typeof telephone !== 'string' || !/^\d+$/.test(telephone)) {
        return res.status(400).json({ error: 'Le téléphone est requis et doit contenir uniquement des chiffres.' });
    }
    if (!statut_paiement || typeof statut_paiement !== 'string' || statut_paiement.trim() === '') {
        return res.status(400).json({ error: 'Le statut de paiement est requis et doit être une chaîne de caractères.' });
    }
    if (note && (typeof note !== 'string' || note.length > 500)) {
        return res.status(400).json({ error: 'La note doit être une chaîne de caractères de maximum 500 caractères.' });
    }

    try {
        // Normalisation des données
        const normalizedPrenom = prenom.trim();
        const normalizedNom = nom.trim();
        const normalizedEmail = email.toLowerCase().trim();

        // Requête SQL pour insérer un nouveau membre
        const query =
            'INSERT INTO membres (prenom, nom, email, telephone, statut_paiement, note) VALUES (?, ?, ?, ?, ?, ?)';
        const [results] = await db.query(query, [
            normalizedPrenom,
            normalizedNom,
            normalizedEmail,
            telephone,
            statut_paiement,
            note || null, // Note facultative
        ]);

        // Réponse HTTP avec les données du membre ajouté
        res.status(201).json({
            id: results.insertId,
            prenom: normalizedPrenom,
            nom: normalizedNom,
            email: normalizedEmail,
            telephone,
            statut_paiement,
            note: note || null,
        });
    } catch (err) {
        console.error('Erreur lors de l\'ajout du membre :', err.message);

        // Gestion des erreurs spécifiques
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Un membre avec cet email existe déjà.' });
        }

        // Erreur générique en cas de problème serveur
        res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
});



// Fonction pour générer un token JWT//
function generateJWT(adminId) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET n\'est pas défini dans les variables d\'environnement');
    }
    return jwt.sign(
        { id: adminId, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '4h' }
    );
}


export default router;