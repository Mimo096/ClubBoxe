import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/AdminDashboard.css';

function AdminDashboard() {
    const [refreshData, setRefreshData] = useState(0);
    const [members, setMembers] = useState([]);
    const [comments, setComments] = useState([]);
    const [responseInput, setResponseInput] = useState({});
    // const [searchQuery, setSearchQuery] = useState('');
    const [isDeleting, setIsDeleting] = useState(null);
    const [editingMember, setEditingMember] = useState(null);



    
    const navigate = useNavigate();
// Références pour les champs de modification
const editPrenomRef = useRef();
const editNomRef = useRef();
const editEmailRef = useRef();
const editTelephoneRef = useRef();
const editStatutPaiementRef = useRef();
const editNoteRef = useRef();

// Références pour les champs du formulaire
    const prenomRef = useRef();
    const nomRef = useRef();
    const emailRef = useRef();
    const telephoneRef = useRef();
    const statutPaiementRef = useRef();
    const noteRef = useRef();

    
    // Vérifier si l'utilisateur est connecté
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) navigate('/admin/login');
        fetchMembers();
        fetchComments();
    }, [navigate,refreshData]);

    // Récupérer tous les membres
    const fetchMembers = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/members', {
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            });
            if (!response.ok) throw new Error('Erreur lors du chargement des membres');
            const data = await response.json();
            setMembers(data);
        } catch (err) {
            console.error(err);
        }
    };



    const handleEditMember = async (event) => {
        event.preventDefault();
    
        const formData = {
            prenom: editPrenomRef.current.value.trim(),
            nom: editNomRef.current.value.trim(),
            email: editEmailRef.current.value.trim(),
            telephone: editTelephoneRef.current.value.trim(),
            statut_paiement: editStatutPaiementRef.current.value.trim(),
            note: editNoteRef.current?.value.trim() || '',
        };
    
        console.log('Données envoyées pour la modification :', formData);
    
        if (!formData.prenom || !formData.nom || !formData.email || !formData.telephone) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
    
        try {
            console.log('ID du membre à modifier :', editingMember.id);
    
            const response = await fetch(`http://localhost:4000/api/members/${editingMember.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify(formData),
            });
    
            console.log('Réponse brute du backend :', response);
            console.log('Statut HTTP :', response.status);
            console.log('Texte de statut :', response.statusText);
    
            if (!response.ok) {
                const responseText = await response.text();
                console.error('Réponse brute (texte) :', responseText);
                throw new Error('Erreur lors de la modification');
            }
    
            const updatedMember = await response.json();
            console.log('Données mises à jour reçues :', updatedMember);
    
            setMembers((prevMembers) =>
                prevMembers.map((member) =>
                    member.id === updatedMember.id ? updatedMember : member
                )
            );
            setEditingMember(null);
            alert('Membre modifié avec succès !');
        } catch (error) {
            console.error('Erreur lors de la modification :', error.message);
            alert(`Une erreur est survenue : ${error.message}`);
        }
    };


    // Récupérer tous les commentaires
    const fetchComments = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/comments', {
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            });
            if (!response.ok) throw new Error('Erreur lors du chargement des commentaires');
            const data = await response.json();
            console.log('Commentaires récupérés depuis le backend :', data); // Log d
            setComments(data);
            console.log('Commentaires récupérés avec succès :', data);
        } catch (err) {
            console.error('Erreur lors de la récupération des commentaires :', err);
        }
    };

    // Ajouter un membre
    const handleAddMember = async (event) => {
        event.preventDefault();
        const formData = {
            prenom: prenomRef.current.value.trim(),
            nom: nomRef.current.value.trim(),
            email: emailRef.current.value.trim(),
            telephone: telephoneRef.current.value.trim(),
            statut_paiement: statutPaiementRef.current.value.trim(),
            note: noteRef.current?.value.trim() || '', // Note facultative
        };
        if (!formData.prenom || !formData.nom || !formData.email || !formData.telephone) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        try {
            const response = await fetch('http://localhost:4000/api/admin/members', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Erreur lors de l\'ajout du membre');
            const newMember = await response.json();
            setMembers((prevMembers) => [...prevMembers, newMember]);
            alert('Membre ajouté avec succès !');

            // Réinitialiser les champs après soumission
            prenomRef.current.value = '';
            nomRef.current.value = '';
            emailRef.current.value = '';
            telephoneRef.current.value = '';
            statutPaiementRef.current.value = '';
            noteRef.current.value = '';
        } catch (error) {
            console.error(error);
            alert(`Une erreur est survenue : ${error.message}`);
        }
    };
    // Supprimer un commenatire //
const handleDeleteComment = async (commentId) => {
    try {
    console.log('Tentative de suppression du commentaire avec l\'ID :', commentId);
    const response = await fetch(`http://localhost:4000/api/comments/${commentId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    });
    console.log('Réponse brute du backend :', response);
    if (!response.ok) {
    const errorData = await response.json();
    console.error('Erreur HTTP reçue du backend :', response.status, response.statusText, errorData);
    throw new Error('Erreur lors de la suppression du commentaire');
    }
    console.log('Commentaire supprimé avec succès dans la base de données.');
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    setRefreshData(prev => prev + 1);
    console.log('Commentaire supprimé avec succès.');
    } catch (error) {
    console.error('Erreur lors de la suppression du commentaire :', error.message);
    alert('Une erreur est survenue lors de la suppression du commentaire.');
    }
    };
    
    
    
    const handleDeleteMember = async (memberId) => {
        try {
            console.log('Tentative de suppression du membre avec l\'ID :', memberId);
            const response = await fetch(`http://localhost:4000/api/members/${memberId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            });
    
            console.log('Réponse brute du backend :', response);
            console.log('Statut HTTP :', response.status);
            console.log('Texte de statut :', response.statusText);
    
            // Gérer les réponses sans corps (204 No Content)
            if (response.status === 204) {
                console.log('Suppression réussie (réponse 204 No Content).');
            } else if (!response.ok) {
                const errorData = await response.json();
                console.error('Erreur HTTP reçue du backend :', response.status, response.statusText, errorData);
                throw new Error(errorData.message || 'Erreur lors de la suppression');
            }
    
            console.log('Membre supprimé avec succès dans la base de données.');
    
            // Mettre à jour l'état local
            setRefreshData((prev) => prev + 1);
            setMembers((prevMembers) => {
                const updatedMembers = prevMembers.filter((member) => member.id !== memberId);
                console.log('Membres après suppression :', updatedMembers);
                return updatedMembers;
            });
    
            alert('Membre supprimé avec succès.');
        } catch (err) {
            console.error('Erreur lors de la suppression :', err.message);
            alert(`Une erreur est survenue : ${err.message}`);
        }
    };
    //Répondre à un commentaire//
    const handleRespondToComment = async (commentId) => {
        const responseInput = prompt('Entrez votre réponse :');
        if (!responseInput) {
            alert('Veuillez entrer une réponse.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/api/comments/${commentId}/respond`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify({ reponse: responseInput }),
            });
            if (!response.ok) throw new Error('Erreur lors de l\'envoi de la réponse');
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId ? { ...comment, reponse: responseInput } : comment
                )
            );
            setRefreshData((prev) => prev + 1); // Forcer la mise à jour
            alert('Réponse envoyée avec succès.');
        } catch (error) {
            console.error(error);
            alert('Une erreur est survenue lors de l\'envoi de la réponse.');
        }
    };



    // Modal de confirmation
    const confirmDelete = (id, type) => setIsDeleting({ id, type });
    const cancelDelete = () => setIsDeleting(null);

    const performDelete = async () => {
        if (isDeleting.type === 'member') {
            await handleDeleteMember(isDeleting.id); // Supprimer un membre
        } else if (isDeleting.type === 'comment') {
            await handleDeleteComment(isDeleting.id); // Supprimer un commentaire
        }
        setIsDeleting(null); // Fermer la modal après la suppression
    };

    return (
       
        <div className="admin-dashboard">
            
            {/* Section Statistiques */}
            <section>
            {console.log('isDeleting =', isDeleting)}
                <h2>Statistiques</h2>
                <p>Total des membres : {members.length}</p>
                <p>Total des commentaires : {comments.length}</p>
            </section>

            Section Gestion des membres
            <section>
                {/* <h2>Gestion des membres</h2>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Rechercher un membre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={() => alert('Fonctionnalité de recherche à implémenter.')}>
                        Rechercher
                    </button>
                </div> */}

                {/* Formulaire d'ajout de membre */}
                <form onSubmit={handleAddMember} style={{ marginBottom: '20px' }}>
                    <input ref={prenomRef} type="text" placeholder="Prénom..." required />
                    <input ref={nomRef} type="text" placeholder="Nom..." required />
                    <input ref={emailRef} type="email" placeholder="Email..." required />
                    <input ref={telephoneRef} type="text" placeholder="Téléphone..." required />
                    <select ref={statutPaiementRef}>
                        <option value="Payé">Payé</option>
                        <option value="En attente">En attente</option>
                        <option value="Non payé">Non payé</option>
                    </select>
                    <textarea ref={noteRef} placeholder="Note (optionnel)..."></textarea>
                    <button type="submit">Ajouter le membre</button>
                </form>

                {/* Liste des membres */}
                <ul className="member-list">
                    {members.map((member) => (
                        <li key={member.id} className="member-item">
                            <p><strong>Prénom :</strong> {member.prenom}</p>
                            <p><strong>Nom :</strong> {member.nom}</p>
                            <p><strong>Email :</strong> {member.email}</p>
                            <p><strong>Téléphone :</strong> {member.telephone}</p>
                            <p><strong>Statut de paiement :</strong> {member.statut_paiement}</p>
                            <p><strong>Note :</strong> {member.note || 'Aucune note'}</p>
                            <div className="member-actions">
                                <button onClick={() => setEditingMember(member)}>Modifier</button>
                                <button onClick={() => confirmDelete(member.id, 'member')}>Supprimer</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Modal de Modification */}
            {editingMember && (
                <div className="edit-member-modal">
                    <h3>Modifier un membre</h3>
                    <form onSubmit={handleEditMember}>
                        <input
                            ref={editPrenomRef}
                            type="text"
                            defaultValue={editingMember.prenom}
                            placeholder="Prénom..."
                            required
                        />
                        <input
                            ref={editNomRef}
                            type="text"
                            defaultValue={editingMember.nom}
                            placeholder="Nom..."
                            required
                        />
                        <input
                            ref={editEmailRef}
                            type="email"
                            defaultValue={editingMember.email}
                            placeholder="Email..."
                            required
                        />
                        <input
                            ref={editTelephoneRef}
                            type="text"
                            defaultValue={editingMember.telephone}
                            placeholder="Téléphone..."
                            required
                        />
                        <select ref={editStatutPaiementRef} defaultValue={editingMember.statut_paiement}>
                            <option value="Payé">Payé</option>
                            <option value="En attente">En attente</option>
                            <option value="Non payé">Non payé</option>
                        </select>
                        <textarea
                            ref={editNoteRef}
                            defaultValue={editingMember.note}
                            placeholder="Note (optionnel)..."
                        ></textarea>
                        <button type="submit">Enregistrer</button>
                        <button type="button" onClick={() => setEditingMember(null)}>
                            Annuler
                        </button>
                    </form>
                </div>
            )}

            {/* Section Gestion des commentaires */}
            <section>
            <h2>Gestion des commentaires</h2>
    <ul>
        {comments.length > 0 ? (
            comments.map((comment) => (
                <li key={comment.id}>
                    <strong>{comment.name}</strong>: {comment.message || 'Aucun texte disponible'}
                    {!comment.reponse && (
                        <div>
                            <input
                                type="text"
                                placeholder="Entrez votre réponse"
                                value={responseInput[comment.id] || ''}
                                onChange={(e) =>
                                    setResponseInput({ ...responseInput, [comment.id]: e.target.value })
                                }
                            />
                            <button onClick={() => handleRespondToComment(comment.id)}>
                                Soumettre
                            </button>
                        </div>
                    )}
                    {comment.reponse && (
                        <p className="admin-response">
                            <strong>Réponse de l'admin :</strong> {comment.reponse}
                        </p>
                    )}
                    <button onClick={() => confirmDelete(comment.id, 'comment')}>
                        Supprimer
                    </button>
                </li>
            ))
        ) : (
            <p>Aucun commentaire disponible.</p>
        )}
    </ul>
            </section>

            {/* Modal de confirmation */}
            {isDeleting && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Voulez-vous vraiment supprimer cet élément ?</p>
                        <button onClick={performDelete}>Oui</button>
                        <button onClick={cancelDelete}>Non</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;