import bcrypt from 'bcrypt';
import db from '../database.js'; // Importez votre connexion à la base de données

export const isAdmin = async (email, password) => {
    try {
        // Validation des entrées
        if (!email || typeof email !== 'string') {
            throw new Error('Email invalide.');
        }
        if (!password || typeof password !== 'string') {
            throw new Error('Mot de passe invalide.');
        }

        // Recherche de l'administrateur par email
        const query = 'SELECT * FROM administrateurs WHERE email = ?';
        const [results] = await db.query(query, [email]);

        // Vérifier si un administrateur a été trouvé
        if (!Array.isArray(results) || results.length === 0) {
            console.log('Aucun administrateur trouvé avec cet email.');
            return false;
        }

        const admin = results[0]; // Première ligne de résultat

        // Comparaison du mot de passe
        const isPasswordValid = await bcrypt.compare(password, admin.mot_de_passe_hash);

        if (!isPasswordValid) {
            console.log('Mot de passe incorrect pour l\'administrateur.');
            return false;
        }

        // Si tout est valide, retourner true
        return true;
    } catch (err) {
        console.error('Erreur lors de la vérification de l\'administrateur :', err.message);
        throw new Error(`Une erreur est survenue lors de la vérification de l'administrateur : ${err.message}`);
    } }

// 2. Ajouter un nouvel administrateur (fonction utilitaire)
export const addAdmin = (email, plainPassword, callback) => {
    const saltRounds = 10; // Nombre de tours pour le hachage

    bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
        if (err) return callback(err, null); // En cas d'erreur lors du hachage

        const query = 'INSERT INTO administrateurs (email, mot_de_passe_hash) VALUES (?, ?)';
        db.query(query, [email, hashedPassword], (err, results) => {
            if (err) return callback(err, null); // En cas d'erreur SQL
            callback(null, results.insertId); // Retourne l'ID de l'administrateur ajouté
        });
    });
};