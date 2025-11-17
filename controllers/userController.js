const userService = require("../services/userService");

class UserController {
    async getAll(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async getById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({message: "User not found"});
            res.json(user);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async update(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            if (!user) return res.status(404).json({message: "User not found"});
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async updateStatus(req, res, next) {
        try {
            const user = await userService.updateStatus(req.params.id);
            if (!user) return res.status(404).json({message: "User not found"});
            res.json(user);
        } catch (err) {
            next(err)
        }
    }

    async getProfile(req, res, next) {
        try {
            const user = await userService.getProfile(req.user.id);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const user = await userService.deleteUser(req.params.id);
            if (!user) return res.status(404).json({message: "User not found controller"});

            res.json({message: "User deleted successfully"});
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController();
