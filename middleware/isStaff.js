module.exports = function isStaff(req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        status: "Failed",
        message: "Unauthorized. Please login first.",
        data: null,
      });
    }

    if (user.role !== "staff" && user.role !== "admin") {
      return res.status(403).json({
        status: "Failed",
        message: "Access denied. Only staff and admin can perform this action.",
        data: null,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Error validating user role.",
      data: null,
    });
  }
};
