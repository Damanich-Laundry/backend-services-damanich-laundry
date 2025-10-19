const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const {asyncHandler} = require("../utils/general");

router.get("/", customerController.getAll);
router.get("/:id", customerController.getById);
router.post("/", asyncHandler(customerController.create));
router.put("/:id", customerController.update);
router.delete("/:id", customerController.delete);

module.exports = router;
