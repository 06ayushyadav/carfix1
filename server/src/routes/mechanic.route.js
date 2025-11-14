import express from "express";
import { body } from "express-validator";
import { createOrUpdateProfile, getAllMechanics, getMyProfile } from "../controller/mechanic.controller.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js"; // or multerLocal.js for local dev
import Mechanic from "../models/mechanic.model.js";
const router = express.Router();

// Protect: mechanic role required
router.use(protect);
router.use(authorizeRoles("mechanic", "admin")); // admin can also create/update

// Get profile
router.get("/me", getMyProfile);

// Create or update profile — accepts multipart/form-data (file + fields)
router.post(
  "/me",
  upload.single("storePhoto"),
  [
    body("name").notEmpty().withMessage("Name required"),
    body("chargePerHour").optional().isNumeric().withMessage("Charge must be numeric"),
  ],
  createOrUpdateProfile
);

// mechanicRoutes.js
router.get("/all",getAllMechanics)


export default router;
