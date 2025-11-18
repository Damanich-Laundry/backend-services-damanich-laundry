const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const {generateTokens, verifyRefreshToken} = require("../utils/jwt");
const {handleJoiErrorMessage} = require("../utils/general");
const {loginUserSchema} = require("../validations/authValidation");
const {ValidationError, AuthenticationError, NotFoundError} = require("../exceptions/errors");

class AuthUsecase {
    async login({email, password}) {
        const {error, value} = loginUserSchema.validate({email, password}, {abortEarly: false});
        if (error) {
            throw new ValidationError(error); // kirim ke global error handler
        }
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AuthenticationError("Invalid email or password");

        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new AuthenticationError("Invalid email or password");
        }

        console.log(user);
        if (!user.is_active) {
            throw new AuthenticationError("User is not active");
        }

        const payload = {id: user.id, email: user.email, role: user.role};
        const tokens = generateTokens(payload);

        return {
            user: {id: user.id, email: user.email, full_name: user.full_name, role: user.role},
            tokens,
        };
    }

    async refreshToken(refreshToken) {
        const decoded = verifyRefreshToken(refreshToken);
        const user = await userRepository.findById(decoded.id);
        if (!user) throw new AuthenticationError("Invalid refresh token");

        const payload = {id: user.id, email: user.email, role: user.role};
        return generateTokens(payload);
    }



    async changePassword(userId, oldPassword, newPassword) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw NotFoundError("User not found");
        }

        const match = await bcrypt.compare(oldPassword, user.password_hash);
        if (!match) {
            const err = new Error("Old password is incorrect");
            err.statusCode = 400;
            throw err;
        }

        const newHash = await bcrypt.hash(newPassword, 10);
        await userRepository.updatePassword(userId, newHash);
        return {message: "Password updated successfully"};
    }

    async logout() {
        // Bisa simpan refresh token blacklist di Redis/DB kalau ingin aman.
        return {message: "Logged out successfully"};
    }
}

module.exports = new AuthUsecase();
