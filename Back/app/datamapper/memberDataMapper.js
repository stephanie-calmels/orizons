const client = require('./client');

const memberDataMapper = {
    async getAllMembers() {
        const result = await client.query("SELECT * FROM member");
        return result.rows
    },

    async getMemberById(memberId) {
        console.log(memberId);
        const result = await client.query("SELECT * FROM member WHERE id = $1", [memberId]);
        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    }
};

module.exports = memberDataMapper;