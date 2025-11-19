// utils/general.js

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

const {
  UniqueConstraintError,
  DatabaseError,
  AppError,
} = require("../exceptions/errors");

function handleSequelizeError(err) {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      return new UniqueConstraintError(err);

    case "SequelizeForeignKeyConstraintError":
      return new AppError(
        "Invalid reference (foreign key constraint failed)",
        409,
        {
          table: err.table,
          fields: err.fields,
        }
      );

    case "SequelizeValidationError":
      return new AppError(
        "Sequelize validation failed",
        400,
        err.errors.map((e) => ({
          field: e.path,
          message: e.message,
        }))
      );

    case "SequelizeDatabaseError":
      switch (err.parent?.code) {
        case "23503":
          return new AppError("Foreign key violation", 409);
        case "22P02":
          return new AppError("Invalid data format", 400);
        default:
          return new DatabaseError(err.message, 500);
      }

    default:
      return err;
  }
}

function handleJoiErrorMessage(error) {
  const err = new Error(error.details[0].message);
  err.statusCode = 400;
  err.details = error.details;
  return err;
}

module.exports = {
  asyncHandler,
  handleSequelizeError,
  handleJoiErrorMessage,
};
