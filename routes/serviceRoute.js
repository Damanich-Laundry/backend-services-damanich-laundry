const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { asyncHandler } = require("../utils/general");

router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getById);
router.post("/", asyncHandler(serviceController.create));
// router.put("/:id", serviceController.update);
// router.delete("/:id", serviceController.delete);

module.exports = router;
