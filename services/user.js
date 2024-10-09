const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

class UserService {
    static async getUsers() {
        return await UserModel.getAllUsers();
    }

    static async addUser(userData) {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const userToCreate = { ...userData, password: hashedPassword };
        return await UserModel.createUser(userToCreate);
    }
}

module.exports = UserService;
