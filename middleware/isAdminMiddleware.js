// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({message: "Missing Authorization header"});
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({message: "Invalid Authorization format"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // simpan payload user ke request
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid or expired token"});
    }
}

function authorizeAdmin(req, res, next) {
    // pastikan sudah melewati authenticate
    if (!req.user) {
        return res.status(401).json({message: "Unauthorized"});
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({message: "Forbidden: Admin only"});
    }

    next();
}

module.exports = {
    authenticate,
    authorizeAdmin,
};
