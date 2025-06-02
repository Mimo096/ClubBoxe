import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css'; // Importe les styles par défaut
import 'swiper/css/navigation'; // Importe les styles pour les flèches
import { Navigation, Autoplay } from 'swiper/modules';
import image1 from '../assets/image1.jpg'; // Importe les images locales
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/co.webp';

import './style/HomePage.css';
 

function HomePage() {
    const [comments, setComments] = useState([]); // État pour stocker les commentaires
    const [visibleComments, setVisibleComments] = useState(5); // Nombre de commentaires visibles
    const [isAdmin, setIsAdmin] = useState(false); // Identifie si l'utilisateur est admin
    const [newCommentName, setNewCommentName] = useState(''); // Gère le champ "nom" du formulaire
    const [newCommentText, setNewCommentText] = useState(''); // Gère le champ "message" du formulaire
    const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement

    // Récupérer les commentaires depuis le backend
    useEffect(() => {
        fetch('http://localhost:4000/api/comments') // URL du backend
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des commentaires');
                }
                return response.json();
            })
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données :', error);
                alert('Une erreur est survenue lors de la récupération des commentaires.');
            });
    }, []);

    // Fonction pour ajouter un nouveau commentaire
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!newCommentName.trim() || !newCommentText.trim()) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        setIsLoading(true); // Activer l'indicateur de chargement

        fetch('http://localhost:4000/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newCommentName, message: newCommentText }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout du commentaire');
                }
                return response.json();
            })
            .then((data) => {
                setComments((prevComments) => [...prevComments, data]);
                setNewCommentName(''); // Réinitialiser le champ du nom
                setNewCommentText(''); // Réinitialiser le champ du texte
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout du commentaire :', error.message);
                alert('Une erreur est survenue lors de l\'ajout du commentaire.');
            })
            .finally(() => {
                setIsLoading(false); // Désactiver l'indicateur de chargement
            });
    };

    // Fonction pour répondre à un commentaire
    const handleRespond = (commentId) => {
        const response = prompt('Entrez votre réponse :'); // Demande à l'utilisateur d'entrer une réponse
        const adminName = prompt('Entrez votre nom (admin) :'); // Nom de l'admin

        if (response && adminName) {
            fetch(`http://localhost:4000/api/comments/${commentId}/respond`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ response, adminName }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la mise à jour de la réponse');
                    }
                    return response.json();
                })
                .then(() => {
                    setComments((prevComments) =>
                        prevComments.map((comment) =>
                            comment.id === commentId
                                ? { ...comment, reponse: response, admin_in: adminName }
                                : comment
                        )
                    );
                })
                .catch((error) => {
                    console.error('Erreur lors de la mise à jour de la réponse :', error);
                    alert('Une erreur est survenue lors de la mise à jour de la réponse.');
                });
        }
    };

    const handleDelete = async (commentId) => {
        try {
            console.log('Tentative de suppression du commentaire avec l\'ID :', commentId);
    
            // Envoi de la requête DELETE au backend
            const response = await fetch(`http://localhost:4000/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            });
    
            // Vérification de la réponse
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erreur HTTP :', response.status, response.statusText, errorData);
                throw new Error('Erreur lors de la suppression du commentaire');
            }
    
            console.log('Commentaire supprimé avec succès dans la base de données.');
    
            // Mise à jour de l'état local
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
            console.log('Commentaire supprimé de l\'état local.');
        } catch (error) {
            console.error('Erreur lors de la suppression :', error.message);
            alert('Une erreur est survenue lors de la suppression du commentaire.');
        }
    };
    return (
        <div>
            {/* Titre principal */}
            <div className="image-container">
       <h1 className="title">RED STAR</h1>
        </div>
   

            
            {/* Section "Découvrir notre club" */}
            <section className="club-section">
                <h2>Découvrir notre club</h2>
                <div className="paragraph-container">
                    <p>
                       Notre club de boxe, fondé en 2009 par Dominique et Idrissa, deux passionnés de sport et d'engagement. Depuis sa création, le club accueille des boxeurs de tous niveaux, dans une ambiance familiale et exigeante, où le respect, la discipline et la progression sont au cœur de chaque entraînement
                    </p>
                </div>
            </section>
{/* Slider Swiper.js */}
            <div className="full-width-slider">
            <Swiper
                modules={[Navigation,Autoplay]} // Active les flèches de navigation
                spaceBetween={50} // Espace entre les slides
                slidesPerView={1} // Une seule image visible à la fois
                navigation // Affiche les flèches "Précédent" et "Suivant"
                loop
  autoplay={{
    delay: 3000, // temps entre les slides (en ms)
    disableOnInteraction: false, // continue même après interaction utilisateur
  }}
>
                <SwiperSlide>
                    <img src={image1} alt="Slide 1" style={{ width: '100%' }} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image2} alt="Slide 2" style={{ width: '100%' }} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image3} alt="Slide 3" style={{ width: '100%' }} />
                </SwiperSlide>
            </Swiper>
            </div>




            {/* Section "Découvrir nos coachs" */}
            <section className="coaches-section">
                <h2>Découvrir nos coachs</h2>
                <div className="stars">★★★★★</div>
                <div className="coaches-container">
                    <div className="coach">
                        <img src={image4} alt="Coach 1" className="coach-image" />
                    </div>
                    <div className="coach">
                        <img src={image4} alt="Coach 2" className="coach-image" />
                    </div>
                    <div className="coach">
                        <img src={image4} alt="Coach 3" className="coach-image" />
                    </div>
                    <div className="coach">
                        <img src={image4} alt="Coach 4" className="coach-image" />
                    </div>
                </div>
            </section>
            

            {/* Section Commentaires */}
            <section className="commentaires-section">
                <h2>Commentaires</h2>

                {/* Formulaire pour ajouter un commentaire */}
                <form id="add-comment-form" onSubmit={handleSubmit}>
                    <input
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        placeholder="Votre nom..."
                        required
                        style={{ marginBottom: '10px', padding: '10px', width: '80%', maxWidth: '600px' }}
                    />
                    <textarea
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder="Ajoutez un commentaire..."
                        required
                        style={{ marginBottom: '10px', padding: '10px', width: '80%', maxWidth: '600px', height: '100px' }}
                    ></textarea>
                    <button type="submit">Soumettre</button>

                </form>

                {/* Liste des commentaires */}
                <div id="comments-list">
                    {comments.slice(0, visibleComments).map((comment) => (
                        <div key={comment.id} className="comment-card">
                            <p className="comment-name"><strong>{comment.name}</strong></p>
                            <p className="comment-text">{comment.message}</p>
                            <p className="comment-date">
                                Posté le : {new Date(comment.date_creation).toLocaleDateString()}
                            </p>
                            {comment.reponse && (
                                <p className="admin-response">
                                    <strong>Réponse de l'admin ({comment.admin_in}) :</strong>{' '}
                                    {comment.reponse}
                                </p>
                            )}
                            {isAdmin && (
                                <div className="comment-actions">
                                    <button onClick={() => handleRespond(comment.id)}>Répondre</button>
                                    <button onClick={() => handleDelete(comment.id)}>Supprimer</button>
                                </div>
                            )}
                        </div>
                    ))}
                    {comments.length > visibleComments && (
                        <button
                            onClick={() => setVisibleComments(comments.length)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginTop: '20px',
                            }}
                        >
                            Voir plus
                        </button>
                    )}
                    {visibleComments > 5 && (
                        <button
                            onClick={() => setVisibleComments(5)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginTop: '10px',
                            }}
                        >
                            Voir moins
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
}

export default HomePage;