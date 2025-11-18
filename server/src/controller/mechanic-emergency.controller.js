import Garage from "../models/gairage/emergency.js";
import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(5).required(),
  phone: Joi.string().pattern(/^[0-9+\-\s]{6,20}$/).required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  services: Joi.array().items(Joi.string()).default([])
});

export const createGarage = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { name, address, phone, lat, lng ,services } = value;

    const newGarage = new Garage({
      name,
      address,
      phone,
      services,
      location: { type: "Point", coordinates: [lng, lat] }
    });

    await newGarage.save();
    res.status(201).json({ message: "Garage registered", garage: newGarage });
  } catch (err) {
    next(err);
  }
};

export const getAllGarages = async (req, res, next) => {
  try {
    const garages = await Garage.find().sort({ createdAt: -1 });
    res.json(garages);
  } catch (err) {
    next(err);
  }
};

export const getNearbyGarages = async (req, res, next) => {
  try {
    const { lat, lng, maxDistance } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: "lat and lng required" });

    const distance = maxDistance ? parseInt(maxDistance, 10) : 5000; 
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    const garages = await Garage.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lngNum, latNum] },
          distanceField: "distance",
          spherical: true,
          maxDistance: distance 
        }
      },
      { $sort: { distance: 1 } },
      { $limit: 50 }
    ]);

    res.json(garages);
  } catch (err) {
    next(err);
  }
};

export const getGarageById = async (req, res, next) => {
  try {
    const garage = await Garage.findById(req.params.id);
    if (!garage) return res.status(404).json({ message: "Garage not found" });
    res.json(garage);
  } catch (err) {
    next(err);
  }
};
