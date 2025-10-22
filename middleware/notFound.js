module.exports = async (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "Failed, API not found",
    data: null,
  });
};
