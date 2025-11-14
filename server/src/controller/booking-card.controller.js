import Mechanic from "../models/mechanic.model.js";

// ✅ CREATE mechanic (garage owner adds mechanic profile)
export const createMechanic = async (req, res) => {
  try {
    const file = req.file;
    const photoUrl = file?.path || "";

    const { name, phone, skills, chargePerHour, address, available } = req.body;

    const skillsArray = skills
      ? skills.split(",").map((s) => s.trim()).filter((s) => s !== "")
      : [];

    const newMechanic = new Mechanic({
      user: req.user._id,
      name,
      phone,
      skills: skillsArray,
      chargePerHour: Number(chargePerHour) || 0,
      address,
      available: available === "true" || available === true,
      storePhoto: photoUrl,
    });

    await newMechanic.save();

    res.status(201).json({
      success: true,
      message: "Mechanic card created successfully!",
      mechanic: newMechanic,
    });
  } catch (err) {
    console.error("❌ Error creating mechanic:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create mechanic",
      error: err.message,
    });
  }
};

// ✅ GET all mechanics (for users)
export const getAllMechanics = async (req, res) => {
  try {
    const { search, skill } = req.query;
    const query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (skill) query.skills = { $in: [skill] };

    const mechanics = await Mechanic.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, mechanics });
  } catch (err) {
    console.error("❌ Error fetching mechanics:", err);
    res.status(500).json({ success: false, message: "Failed to fetch mechanics" });
  }
};

// ✅ GET single mechanic by ID
export const getMechanicById = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic)
      return res.status(404).json({ success: false, message: "Mechanic not found" });

    res.status(200).json({ success: true, mechanic });
  } catch (err) {
    console.error("❌ Error fetching mechanic:", err);
    res.status(500).json({ success: false, message: "Failed to fetch mechanic" });
  }
};

// ✅ UPDATE mechanic (only owner or admin)
export const updateMechanic = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic)
      return res.status(404).json({ success: false, message: "Mechanic not found" });

    // check ownership or admin
    if (mechanic.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this mechanic" });
    }

    const file = req.file;
    const photoUrl = file?.path;

    const { name, phone, skills, chargePerHour, address, available } = req.body;

    const updateData = {
      name,
      phone,
      chargePerHour,
      address,
      available: available === "true" || available === true,
    };

    if (skills)
      updateData.skills = skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");

    if (photoUrl) updateData.storePhoto = photoUrl;

    const updated = await Mechanic.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Mechanic updated successfully",
      mechanic: updated,
    });
  } catch (err) {
    console.error("❌ Error updating mechanic:", err);
    res.status(500).json({ success: false, message: "Failed to update mechanic" });
  }
};

// ✅ DELETE mechanic (only owner or admin)
export const deleteMechanic = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic)
      return res.status(404).json({ success: false, message: "Mechanic not found" });

    if (mechanic.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this mechanic" });
    }

    await mechanic.deleteOne();

    res.status(200).json({ success: true, message: "Mechanic deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting mechanic:", err);
    res.status(500).json({ success: false, message: "Failed to delete mechanic" });
  }
};
