import Mechanic from "../models/mechanic.model.js";
import { validationResult } from "express-validator";


export async function createOrUpdateProfile(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, skills, chargePerHour, address, phone } = req.body;
    const storePhoto = req.file?.path || req.file?.secure_url || "";

    let mechanic;
    if (req.user && req.user.role === "mechanic") {
      mechanic = await Mechanic.findOneAndUpdate(
        { user: req.user._id },
        {
          name,
          skills: skills ? (Array.isArray(skills) ? skills : skills.split(",").map(s=>s.trim())) : [],
          chargePerHour: Number(chargePerHour || 0),
          address,
          phone,
          ...(storePhoto ? { storePhoto } : {}),
        },
        { new: true, upsert: true }
      );
      mechanic.user = req.user._id;
      await mechanic.save();
    } else {
      mechanic = await Mechanic.create({
        name,
        skills: skills ? (Array.isArray(skills) ? skills : skills.split(",").map(s=>s.trim())) : [],
        chargePerHour: Number(chargePerHour || 0),
        address,
        phone,
        storePhoto,
      });
    }

    res.json({ success: true, mechanic });
  } catch (err) {
    console.error("mechanic create error", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getMyProfile(req, res) {
  try {
    let mechanic;
    if (req.user && req.user.role === "mechanic") {
      mechanic = await Mechanic.findOne({ user: req.user._id });
    } else {
      return res.status(403).json({ message: "Not a mechanic account" });
    }
    res.json({ mechanic });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export async function getAllMechanics(req, res) {
  try {
    
    const mechanics = await Mechanic.find({})
      .populate("user", "name email") 
      .select("name skills chargePerHour address phone storePhoto createdAt");

    res.status(200).json({
      success: true,
      count: mechanics.length,
      mechanics,
    });
  } catch (err) {
    console.error("Error fetching mechanics:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mechanics",
      error: err.message,
    });
  }
}
