import mysql from 'mysql2/promise'; // Importez le mode Promise

// Création du pool de connexions à la base de données
const db = mysql.createPool({
    host: 'db.3wa.io', // Adresse du serveur MySQL
    user: 'achrefarouri', // Nom d'utilisateur
    password: '8b79e1cc2c64b17d7030f9a5611256de', // Mot de passe
    database: 'achrefarouri_club_boxe', // Nom de la base de données
    waitForConnections: true, // Attendre si toutes les connexions sont utilisées
    connectionLimit: 10, // Limite maximale de connexions simultanées
    queueLimit: 0, // Pas de limite pour la file d'attente
});

// Tester la connexion à la base de données
(async () => {
    try {
        const connection = await db.getConnection(); // Obtenez une connexion
        console.log('Connecté à la base de données MySQL');
        connection.release(); // Libérez la connexion après le test
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        process.exit(1); // Arrêtez le serveur en cas d'échec
    }
})();

export default db;