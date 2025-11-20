const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const {generateTokens, verifyRefreshToken} = require("../utils/jwt");
const {handleJoiErrorMessage} = require("../utils/general");
const {loginUserSchema} = require("../validations/authValidation");
const {
    ValidationError,
    AuthenticationError,
    NotFoundError,
} = require("../exceptions/errors");
const validator = require("./validationUsecase"); // instance

class AuthUsecase {
    constructor({validator}) {
        this.validator = validator;
    }

    async login(payload = {}) {
        const {email, password} = payload;

        const value = this.validator.validateSchema(loginUserSchema, {email, password},);


        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AuthenticationError("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new AuthenticationError("Invalid email or password");
        }

        if (!user.is_active) {
            throw new AuthenticationError("User is not active");
        }

        const payloadJwt = {id: user.id, email: user.email, role: user.role};
        const tokens = generateTokens(payloadJwt);

        return {
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
            },
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


    async logout() {
        return {message: "Logged out successfully"};
    }
}

module.exports = new AuthUsecase({validator});
