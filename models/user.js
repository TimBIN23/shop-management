const pool = require('../config/db');

class UserModel {
    static async getAllUsers() {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query('SELECT * FROM users');
            return rows;
        } finally {
            if (conn) conn.end();
        }
    }

    static async createUser(userData) {
        let conn;
        try {
            const { name, email, password } = userData;
            conn = await pool.getConnection();
            const res = await conn.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
            return res;
        } finally {
            if (conn) conn.end();
        }
    }
}

module.exports = UserModel;
