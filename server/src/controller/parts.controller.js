import Part from "../models/gairage/parts.js";

export const createPart = async (req, res) => {
  const userId = req.user?._id;
  try {
    const { name, description, category, brand, compatibility, price, stock } =
      req.body;
    const photo = req.file?.path || req.file?.secure_url || "";

    const part = await Part.create({
      sellBy: userId, 
      name,
      description,
      category,
      brand,
      compatibility,
      price,
      stock,
      photo,
    });

    res.status(201).json({ success: true, part });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllParts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };

    const parts = await Part.find(query)
    .populate("sellBy","name email phone")
    .sort({ createdAt: -1 });
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id).
    populate("sellBy","name email phone")
    
    if (!part) return res.status(404).json({ message: "Part not found" });
    res.json(part);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePart = async (req, res) => {
  try {
    const updatedPart = await Part.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPart)
      return res.status(404).json({ message: "Part not found" });
    res.json(updatedPart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePart = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ message: "Part not found" });

    await part.deleteOne();
    res.json({ message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
