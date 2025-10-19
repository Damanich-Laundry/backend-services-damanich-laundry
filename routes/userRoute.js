const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {asyncHandler} = require("../utils/general");

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", asyncHandler(userController.create));
router.put("/:id", userController.update);
router.put("/:id/toggle-status", userController.updateStatus);
router.delete("/:id", userController.delete);

module.exports = router;
