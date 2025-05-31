console.log('Chargement de commentairesRoutes.js');
import db from '../database.js';
import express from 'express';
const router = express.Router();

import { getAllComments, addComment, respondToComment, deleteComment } from '../models/commentaireModel.js';

// Route pour récupérer tous les commentaires
router.get('/', async (req, res) => {
    try {
        console.log('Début de la récupération des commentaires'); // Log de début
        const comments = await getAllComments();
        console.log('Commentaires récupérés :', comments); // Log des résultats
        res.json(comments); // Renvoyez les commentaires au client
    } catch (err) {
        console.error('Erreur dans la route GET /api/comments :', err); // Log de l'erreur
        res.status(500).json({ error: 'Erreur serveur' });
    }
});




// Route pour ajouter un nouveau commentaire
router.post('/', async (req, res) => {
    const { name, message } = req.body;

    // Validation des données
    if (!name || !message) {
        return res.status(400).json({ error: 'Le nom et le contenu du commentaire sont requis' });
    }

    try {
        // Appel à la fonction addComment
        const commentId = await addComment(name, message);
        console.log('Nouveau commentaire ajouté avec ID :', commentId);

        // Réponse réussie
        res.status(201).json({
            id: commentId,
            name,
            message,
            date_creation: new Date().toISOString(),
        });
    } catch (err) {
        console.error('Erreur lors de l\'ajout du commentaire :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


router.post('/:id/respond', async (req, res) => {
    console.log('Route /api/comments/:id/respond atteinte');
    const { id } = req.params;
    const { reponse } = req.body;

    try {
        // Mettre à jour le commentaire avec la réponse
        const [updatedRows] = await db.query(
            'UPDATE commentaires SET reponse = ? WHERE id = ?',
            [reponse, id]
        );
        console.log('Nombre de lignes supprimées :', deletedRows.affectedRows);

        if (updatedRows.affectedRows === 0) {
            return res.status(404).json({ error: 'Commentaire non trouvé' });
        }

        res.json({ message: 'Réponse ajoutée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

//

// 4. Route pour supprimer un commentaire
router.delete('/:id', (req, res) => {
    const commentId = req.params.id;

    deleteComment(commentId, (err, success) => {
        if (err) {
            console.error('Erreur lors de la suppression du commentaire :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (!success) {
            return res.status(404).json({ error: 'Commentaire non trouvé' });
        }
        res.json({ message: 'Commentaire supprimé avec succès' });
    });
});

export default router;