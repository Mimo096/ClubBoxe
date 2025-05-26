console.log('Chargement de membresRoutes.js');
import express from 'express';
import db from '../database.js';
import verifyAdmin from '../middlewares/authMiddleware.js'
const router = express.Router();

// 1. Récupérer tous les membres
router.get('/',verifyAdmin, async (req, res) => {
    try {
        const query = 'SELECT * FROM membres';
        const [results] = await db.query(query); // Utilisation de promesses avec async/await
        res.json(results); // Renvoie les résultats sous forme de JSON
    } catch (err) {
        console.error('Erreur lors de la récupération des membres :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 2. Récupérer un membre par son ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM membres WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du membre :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Membre non trouvé' });
        }
        res.json(results[0]);
    });
});

// Route pour supprimer un membre
router.delete('/:id', (req, res) => {
    const memberId = req.params.id;
    console.log('Requête DELETE reçue pour l\'ID :', memberId);

    db.query('DELETE FROM membres WHERE id = ?', [memberId], (err, results) => {
        if (err) {
            console.error('Erreur SQL lors de la suppression :', err.message);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (results.affectedRows === 0) {
            console.log('Aucun membre trouvé avec l\'ID :', memberId);
            return res.status(404).json({ error: 'Membre non trouvé' });
        }
        console.log('Membre supprimé avec succès pour l\'ID :', memberId);
        res.json({ message: 'Membre supprimé avec succès' });
    });
});


 
/// Route pour modifier un membre
router.put('/:id', verifyAdmin, async (req, res) => {
    console.log('Route PUT /api/members/:id appelée');
    console.log('ID reçu :', req.params.id);
    console.log('Données reçues :', req.body);

    const { id } = req.params;
    const { prenom, nom, email, telephone, statut_paiement, note } = req.body;

    if (!prenom || !nom || !email || !telephone) {
        console.error('Champs requis manquants');
        return res.status(400).json({ error: 'Tous les champs requis doivent être remplis' });
    }

    try {
        const query = `
            UPDATE membres 
            SET prenom = ?, nom = ?, email = ?, telephone = ?, statut_paiement = ?, note = ? 
            WHERE id = ?
        `;
        const [results] = await db.query(query, [prenom, nom, email, telephone, statut_paiement, note, id]);

        if (results.affectedRows === 0) {
            console.error('Aucun membre trouvé avec cet ID');
            return res.status(404).json({ error: 'Membre non trouvé' });
        }

        console.log('Membre modifié avec succès');
        res.json({ message: 'Membre modifié avec succès' });
    } catch (error) {
        console.error('Erreur lors de la modification du membre :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;