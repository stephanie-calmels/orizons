const memberDataMapper = require('../datamapper/memberDataMapper');
const memberController = {
    async getAllMember(_, response, next) {
        try {

            const members = await memberDataMapper.getAllMembers();
            response.json({
                data: members
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
            // A voir
            const member = await memberDataMapper.createMember();
            response.json({
                data: member
            })
        } catch (error) {
            next(error)
        }
    },
    async updateAllMember(request, response, next) {
        try {
            const members = await memberDataMapper.updateAllMember();
            response.json({
                data: categories
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
            const member = await memberDataMapper.updateOneMember(memberId);
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