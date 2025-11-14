// routes/garages.js
import express from "express";
import {
  createGarage,
  getAllGarages,
  getNearbyGarages,
  getGarageById
} from "../../controller/mechanic-emergency.controller.js";

const router = express.Router();

router.post("/", createGarage);
router.get("/", getAllGarages);
router.get("/near", getNearbyGarages);
router.get("/:id", getGarageById);

export default router;
