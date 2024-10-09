const UserService = require('../services/user');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users' });
        }
    }

    static async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            await UserService.addUser({ name, email, password });
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }
}

module.exports = UserController;
