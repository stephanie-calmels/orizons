const memberDataMapper = require('../datamapper/memberDataMapper');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');

// Multer : indiquer le chemin de stockage des photos
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callbackb(null, '/public/uploads/profile');
    },
    filename: (request, file, callback) => {
        // arriver à ajouter id du member pour identifier plus facilement la photo 
        const fileName = Date.now() + originalname.toLowerCase().split(' ').join('-');
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



const memberController = {
    async getAllMember(_, response, next) {
        try {

            const members = await memberDataMapper.getAllMembers();
            response.json({
                data: members,
            });
        } catch (error) {
            next(error)
        }

    },

    async loginMember(request, response, next) {
        try {
            const {
                email,
                password
            } = request.body;
            const member = await memberDataMapper.getMemberLogin(email);
            if (!member) {
                return response.status(404).send({
                    token: null,
                    message: "L\'adresse email n\'existe pas !"
                })
            }

            const isPasswordValid = bcrypt.compareSync(
                password,
                member.password
            );

            if (!isPasswordValid) {
                // gestion des erreurs
                return response.status(401).send({
                    token: null,
                    message: 'Mot de passe incorrect'
                });
            }

            // on crée le Jwt
            const jwtContent = {
                memberId: member.id
            };
            const jwtOptions = {
                algorithm: 'HS256',
                expiresIn: '3h'
            };
            response.json({
                token: jsonwebtoken.sign(jwtContent, process.env.SECRET, jwtOptions)
            });
        } catch (error) {
            next(error)
        }
    },

    async getOneMember(request, response, next) {
        try {
            const {
                memberId
            } = request.params
            console.log(request.params);
            const member = await memberDataMapper.getMemberById(memberId);
            response.json({
                data: member
            })
        } catch (error) {
            next(error)
        }

    },

    async createMember(request, response, next) {
        try {
            const newMember = request.body;

            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(newMember.password, saltRounds);

            const member = await memberDataMapper.createMember({
                first_name: newMember.first_name,
                last_name: newMember.last_name,
                nickname: newMember.nickname,
                email: newMember.email,
                password: hashedPassword
            });
            response.json({
                message: member
            })
        } catch (error) {
            next(error)
        }
    },
    async updateAllMember(request, response, next) {
        try {
            const members = await memberDataMapper.updateAllMember();
            response.json({
                data: members
            })
        } catch (error) {
            next(error)
        }
    },
    async updateOneMember(request, response, next) {
        try {
            const {
                memberId
            } = request.params;

            const memberInfos = request.body;
            const member = await memberDataMapper.updateOneMember(memberId, memberInfos);
            //const member = await memberDataMapper.getMemberById(memberId)
            response.json({
                data: member
            })
        } catch (error) {
            next(error)
        }
    },
    async deleteAllMember(request, response, next) {
        try {

            const members = await memberDataMapper.deleteAllMember();
            response.json({
                data: members
            })
        } catch (error) {
            next(error)
        }
    },
    async deleteOneMember(request, response, next) {
        try {
            const {
                memberId
            } = request.params
            const member = await memberDataMapper.deleteOneMember(memberId);
            response.json({
                data: member
            })
        } catch (error) {
            next(error)
        }
    },
};

module.exports = memberController;