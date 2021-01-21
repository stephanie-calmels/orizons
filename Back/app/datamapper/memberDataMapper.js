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
    },

    async createMember(newMember) {
        console.log('2', newMember);
        const result = await client.query("INSERT INTO member(first_name, last_name, nickname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *", [
            newMember.first_name,
            newMember.last_name,
            newMember.nickname,
            newMember.email,
            newMember.password
        ])
        return result.rows[0]
    }
};

module.exports = memberDataMapper;