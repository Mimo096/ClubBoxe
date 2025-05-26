import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Vérifie que l'en-tête Authorization existe et commence par "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Accès non autorisé' });
    }

    const token = authHeader.split(' ')[1]; // Extrait le token JWT
    if (!token) {
        console.error('Token manquant');
        return res.status(401).json({ error: 'Accès non autorisé' });
    }
    try {
        // Vérifie que JWT_SECRET est défini
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET n\'est pas défini dans les variables d\'environnement');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie le token
        console.log('Token valide :', decoded);
        // Vérifie que l'utilisateur a le rôle "admin"
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
        }

        req.user = decoded; // Ajoute les informations de l'utilisateur au contexte de la requête
        next();
    } catch (err) {
        console.error('Erreur lors de la vérification du token :', err.message);
        return res.status(401).json({ error: 'Token invalide' });
    }
};

export default verifyAdmin; // Exporter la fonction avec export default