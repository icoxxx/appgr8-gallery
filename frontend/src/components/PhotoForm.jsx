import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const PhotoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchPhoto = async () => {
                try {
                    const photo = await api.getPhotoById(id);
                    setTitle(photo.title);
                    setDescription(photo.description);
                } catch (error) {
                    console.error('Failed to fetch photo:', error.message);
                }
            };
            fetchPhoto();
        }
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!id) {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('title', title);
                formData.append('description', description);
                await api.createPhoto(formData);
            } else {
                await api.updatePhoto(id, { title, description });
            }
            navigate('/');
        } catch (error) {
            console.error('Failed to save photo:', error.message);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <h1>{id ? 'Edit Photo' : 'Add Photo'}</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                {!id && (
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={handleFileChange} required />
                    </div>
                )}
                <button type="submit">{id ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};

export default PhotoForm;
