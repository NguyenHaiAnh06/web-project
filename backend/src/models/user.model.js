const db = require('../config/db');

class User {
    static async create(username, password) {
        return db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    }

    static async findByUsername(username) {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }
}

module.exports = User;