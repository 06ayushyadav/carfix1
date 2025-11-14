import express from "express";
import {
  createPart,
  getAllParts,
  getPartById,
  updatePart,
  deletePart,
} from "../../controller/parts.controller.js";
import upload from "../../config/multer.js"
import { protect , authorizeRoles } from "../../middlewares/authMiddleware.js";
 

const router = express.Router();
router.use(protect)
router.use(authorizeRoles("mechanic", "admin","user"));

// Create a new part (image upload)
router.post("/" ,upload.single("photo"), createPart);

// Get all parts
router.get("/allparts", getAllParts);

// Get single part
router.get("/:id", getPartById);

// Update part
router.put("/:id", upload.single("photo"), updatePart);

// Delete part
router.delete("/:id", deletePart);

export default router;
