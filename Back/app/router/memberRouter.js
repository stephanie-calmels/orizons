const express = require('express');
const jwt = require('../middleware/auth');

const multer = require('multer');

// Multer : indiquer le chemin de stockage des photos
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/uploads/profile');
    },
    filename: (request, file, callback) => {
        // arriver à ajouter id du member pour identifier plus facilement la photo 
        const fileName = Date.now() + file.originalname.toLowerCase().split(' ').join('-');
        callback(null, fileName)
    }
});

// Multer : appliquer un filtre de format
const fileFilter = (request, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Seuls les formats .png, .jpg and .jpeg sont autorisés ! '));
    }
}

// Multer : appliquer un filtre de taille de fichier max 5 mb
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const memberController = require('../controllers/memberController');
const router = express.Router();

router.get('/', memberController.getAllMember);
//router.get('/', jwt, memberController.getAllMember);
router.get('/:memberId', memberController.getOneMember);
//router.get('/:memberId', jwt, memberController.getOneMember);
router.post('/', memberController.createMember);
router.patch('/', memberController.updateAllMember);

router.patch('/:memberId', memberController.updateOneMember); // toutes les infos sauf pw, profilephoto et bannnière eet la biography
router.patch('/profile_photo/:memberId', upload.single('profilePhoto'), memberController.updateProfilePhoto);



router.delete('/', jwt, memberController.deleteAllMember);
router.delete('/:memberId', jwt, memberController.deleteOneMember);

router.post('/login', memberController.loginMember);

module.exports = router;