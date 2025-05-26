import db from '../ database.js'

// Ajouter un nouveau membre
const addMember = (name, email, callback) => {
    const query = 'INSERT INTO members (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results.insertId);
    });
};

// Supprimer un membre
const deleteMember = (memberId, callback) => {
    const query = 'DELETE FROM members WHERE id = ?';
    db.query(query, [memberId], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results.affectedRows > 0);
    });
};







module.exports = { addMember, deleteMember };

