import { addAdmin } from '../models/admin.js';

const email = 'admin@example.com';
const plainPassword = 'monmotdepasse';

addAdmin(email, plainPassword, (err, adminId) => {
    if (err) {
        console.error('Erreur lors de l\'ajout de l\'administrateur :', err);
        return;
    }
    console.log('Administrateur ajouté avec succès. ID :', adminId);
});