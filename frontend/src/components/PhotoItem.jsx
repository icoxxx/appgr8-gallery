import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const PhotoItem = ({ photo }) => {
    const deletePhoto = async () => {
        await api.delete(`/${photo._id}`);
        window.location.reload();
    };

    return (
        <div className="photo-item-container">
            <div className="image-container">
            <img src={photo.imageUrl} alt={photo.title} />
            </div>
            <h3>{photo.title}</h3>
            <p>{photo.description}</p>
            <Link to={`/edit/${photo._id}`}>Edit</Link>
            <button onClick={deletePhoto}>Delete</button>
        </div>
    );
};

export default PhotoItem;
