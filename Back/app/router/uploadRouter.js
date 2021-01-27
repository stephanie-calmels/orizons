const upload = multer({
    storage: storage,

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