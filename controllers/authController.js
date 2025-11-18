const authUsecase = require("../usecases/authUsecase");

class AuthController {
    // POST /api/auth/login
    async login(req, res, next) {
        try {
            const result = await authUsecase.login(req.body);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    // POST /api/auth/logout
    async logout(req, res, next) {
        try {
            const result = await authUsecase.logout();
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    // POST /api/auth/refresh-token
    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const tokens = await authUsecase.refreshToken(refreshToken);
            res.status(200).json(tokens);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new AuthController();
