const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Seuls les formats .png, .jpg and .jpeg sont autorisés ! '));
        }
    }
});

router.post('/profile-photo', upload.single('profilePhoto'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    console.log("on vient d'uploader le fichier qui a le path: " + url + 'public' + req.file.filename)
    // profile_photo: url + '/public/' + req.file.filename
});