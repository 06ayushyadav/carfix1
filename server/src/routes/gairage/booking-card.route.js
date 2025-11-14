import express from "express";
import parser from "../../config/multer.js";
import {
  createMechanic,
  getAllMechanics,
  getMechanicById,
  updateMechanic,
  deleteMechanic,
} from "../../controller/booking-card.controller.js";
import { protect, authorizeRoles } from "../../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post(
  "/create",
  protect,
  authorizeRoles("mechanic", "admin"),
  parser.single("storePhoto"),
  createMechanic
);

router.get("/all", getAllMechanics);

router.get("/:id", getMechanicById);

router.put(
  "/update/:id",
  protect,
  authorizeRoles("mechanic", "admin"),
  parser.single("storePhoto"),
  updateMechanic
);

router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("mechanic", "admin"),
  deleteMechanic
);

export default router;
