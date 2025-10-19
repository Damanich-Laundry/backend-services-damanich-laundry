const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";
const JWT_EXPIRES_IN = "15m";
const JWT_REFRESH_EXPIRES_IN = "7d";

exports.generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: JWT_REFRESH_EXPIRES_IN});
    return {accessToken, refreshToken};
};

exports.verifyAccessToken = (token) => jwt.verify(token, JWT_SECRET);
exports.verifyRefreshToken = (token) => jwt.verify(token, JWT_REFRESH_SECRET);
