const authService = require("../services/authService");

class AuthController {
    // POST /api/auth/login
    async login(req, res, next) {
        try {
            const result = await authService.login(req.body);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    // POST /api/auth/logout
    async logout(req, res, next) {
        try {
            const result = await authService.logout();
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    // POST /api/auth/refresh-token
    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const tokens = await authService.refreshToken(refreshToken);
            res.status(200).json(tokens);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new AuthController();
