const apiUrl = 'http://localhost:5000/api/photos';

const api = {
    getPhotos: async () => {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch photos: ${response.statusText}`);
        }
        return await response.json();
    },
    createPhoto: async (photoData) => {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photoData),
        });
        if (!response.ok) {
            throw new Error(`Failed to create photo: ${response.statusText}`);
        }
        return await response.json();
    },
    updatePhoto: async (id, photoData) => {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photoData),
        });
        if (!response.ok) {
            throw new Error(`Failed to update photo: ${response.statusText}`);
        }
        return await response.json();
    },
    deletePhoto: async (id) => {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete photo: ${response.statusText}`);
        }
        return await response.json();
    },
};

export default api;
