const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callbackb(null, __dirname + '/uploads/images');
    },
    filename: (request, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (request, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Seuls les formats .png, .jpg and .jpeg sont autorisés ! '));
        }
    }
});

router.post('/profile-photo', upload.single('profilePhoto'), (request, response, next) => {
    console.log(request);
    const url = request.protocol + '://' + request.get('host');
    console.log("on vient d'uploader le fichier qui a le path: " + url + 'public' + req.file.filename)
    // profile_photo: url + '/public/uploads' + req.file.filename
    response.json({
        data: "ça a marché!!"
    });
});