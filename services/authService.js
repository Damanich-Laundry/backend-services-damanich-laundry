const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const {generateTokens, verifyRefreshToken} = require("../utils/jwt");
const {handleJoiErrorMessage} = require("../utils/general");

class AuthService {
    async login({email, password}) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            const err = new Error("Invalid email or password");
            err.statusCode = 401;
            throw err;
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            const err = new Error("Invalid email or password");
            err.statusCode = 401;
            throw err;
        }

        const payload = {id: user.id, email: user.email, role: user.role};
        const tokens = generateTokens(payload);

        return {
            user: {id: user.id, email: user.email, full_name: user.full_name, role: user.role},
            tokens,
        };
    }

    async refreshToken(refreshToken) {
        try {
            const decoded = verifyRefreshToken(refreshToken);
            const user = await userRepository.findById(decoded.id);
            if (!user) throw new Error("User not found");

            const payload = {id: user.id, email: user.email, role: user.role};
            return generateTokens(payload);
        } catch (err) {
            const error = new Error("Invalid refresh token");
            error.statusCode = 401;
            throw error;
        }
    }

    async getProfile(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }
        return user;
    }

    async changePassword(userId, oldPassword, newPassword) {
        const user = await userRepository.findById(userId);
        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
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

module.exports = new AuthService();
