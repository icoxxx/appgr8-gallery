import React, { useState, useEffect } from 'react';
import api from '../api';
import PhotoItem from './PhotoItem';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await api.getPhotos();
            console.log(response)
            setPhotos(response);
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h1>Photo Gallery</h1>
            <div className="photo-grid">
                {photos && photos.length > 0 && (photos.map(photo => (
                    <PhotoItem key={photo._id} photo={photo} />
                )))}
            </div>
        </div>
    );
};

export default PhotoList;
