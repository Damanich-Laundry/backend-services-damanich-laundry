// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const {AuthenticationError} = require("../exceptions/errors");


function authorizeAdmin(req, res, next) {
    // pastikan sudah melewati authenticate
    if (!req.user) {
        throw new AuthenticationError("Unauthorized");
    }

    if (req.user.role !== "admin") {
        throw new AuthenticationError("This data can be accessed by admin only");
    }

    next();
}

module.exports = {
    authorizeAdmin,
};
