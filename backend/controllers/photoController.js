const { Storage } = require('@google-cloud/storage');
const Photo = require('../models/Photos');
const multer = require('multer');
const path = require('path');
const storage = new Storage({
    keyFilename: path.join(__dirname, '../service-key/fifth-legacy-423609-s6-4c1ed8ada01f.json'),
    projectId: 'fifth-legacy-423609-s6'
});
const bucket = storage.bucket('appgreat-photos');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    }
}).single('image');

const createPhoto = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).send(err.message);

        const { title, description } = req.body;
        if (!req.file) return res.status(400).send('No file uploaded.');

        const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => res.status(500).send(err.message));

        blobStream.on('finish', async () => {
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            const photo = new Photo({ title, description, imageUrl });
            await photo.save();
            res.status(201).send(photo);
        });

        blobStream.end(req.file.buffer);
    });
};

const getPhotos = async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    const photos = await Photo.find().limit(limit * 1).skip((page - 1) * limit).exec();
    res.send(photos);
};

const getPhotoById = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).send('Photo not found.');
    res.send(photo);
};

const updatePhoto = async (req, res) => {
    const { title, description } = req.body;
    const photo = await Photo.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!photo) return res.status(404).send('Photo not found.');
    res.send(photo);
};

const deletePhoto = async (req, res) => {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) return res.status(404).send('Photo not found.');
    res.send(photo);
};

module.exports = { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto };
