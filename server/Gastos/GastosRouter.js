const express = require("express");
const router = express.Router();

// Controllers
const GastosController = require("./GastosController");

// Authorization
const verifyToken = require("../Middlewares/verifyToken");

router.get("/", GastosController.getGastos);
router.get("/:id", GastosController.getGasto);
router.post("/", verifyToken, GastosController.createGasto);
router.delete("/:id", verifyToken, GastosController.deleteGasto);
router.patch("/:id", verifyToken, GastosController.updateGasto);

module.exports = router;
