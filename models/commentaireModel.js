import db from '../database.js';

// 1. Récupérer tous les commentaires
export const getAllComments = async () => {
    try {
        console.log('Exécution de la requête SQL pour récupérer les commentaires'); 
        const [rows] = await db.query('SELECT * FROM commentaires ORDER BY date_creation DESC');
        // Utilisez await pour attendre la promesse
        console.log('Résultats de la requête SQL :', rows); // Log des résultats
        return rows; // Retournez les résultats
    } catch (err) {
        console.error('Erreur lors de la récupération des commentaires :', err);
        throw err; // Propagez l'erreur
    }
};

export const addComment = async (name, message) => {
    try {
        // Validation des champs requis
        if (!name || !message) {
            throw new Error('Le nom et le message sont requis');
        }

        // Validation des types de données
        if (typeof name !== 'string' || typeof message !== 'string') {
            throw new Error('Le nom et le message doivent être des chaînes de caractères');
        }

        // Limitation de la taille des champs
        if (name.length > 100 || message.length > 1000) {
            throw new Error('Le nom ne doit pas dépasser 100 caractères et le message 1000 caractères');
        }

        // Préparation de la requête SQL
        const query = 'INSERT INTO commentaires (name, message, date_creation) VALUES (?, ?, ?)';
        const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Exécution de la requête
        console.log('Insertion d\'un nouveau commentaire :', { name, message, formattedDate });
        const [results] = await db.query(query, [name, message, formattedDate]);

        // Retour de l'ID inséré
        return results.insertId;
    } catch (err) {
        console.error('Erreur lors de l\'ajout du commentaire :', err.message);
        throw err; // Propagez l'erreur pour qu'elle soit gérée par l'appelant
    }
};

export const respondToComment = async (commentId, response, adminId) => {
    try {
        // Vérifiez que tous les paramètres requis sont fournis
        if (!commentId || !response || !adminId) {
            throw new Error('Tous les paramètres (commentId, response, adminId) sont requis');
        }

        // Préparez la requête SQL
        const query = 'UPDATE commentaires SET reponse = ?, admin_id = ? WHERE id = ?';

        // Exécutez la requête avec mysql2/promise
        const [results] = await db.query(query, [response, adminId, commentId]);

        // Vérifiez si une ligne a été mise à jour
        return results.affectedRows > 0;
    } catch (err) {
        console.error('Erreur lors de la mise à jour de la réponse :', err);
        throw err; // Propagez l'erreur pour qu'elle soit gérée par l'appelant
    }
};

export const deleteComment = async (commentId) => {
    try {
        // Vérifiez que l'ID du commentaire est fourni
        if (!commentId) {
            throw new Error('L\'ID du commentaire est requis');
        }

        // Préparez la requête SQL
        const query = 'DELETE FROM commentaires WHERE id = ?';

        // Exécutez la requête avec mysql2/promise
        const [results] = await db.query(query, [commentId]);

        // Vérifiez si une ligne a été supprimée
        return results.affectedRows > 0;
    } catch (err) {
        console.error('Erreur lors de la suppression du commentaire :', err);
        throw err; // Propagez l'erreur pour qu'elle soit gérée par l'appelant
    }
};