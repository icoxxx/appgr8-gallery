const express = require('express');
const mongoose = require('mongoose');
const photoRoutes = require('./routes/photoRoutes');
const app = express();

app.use(express.json());
app.use('/api/photos', photoRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/photo_gallery', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
