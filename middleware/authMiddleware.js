const jwt = require("jsonwebtoken");
const {AuthenticationError} = require("../exceptions/errors");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "Unauthorized"});
    }

    const token = authHeader.split(" ")[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET); // simpan info user di request
        next();
    } catch (err) {
        throw new AuthenticationError("Invalid or expired token");
    }
};
