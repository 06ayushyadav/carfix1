import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "autofix/mechanics",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  },
});

const parser = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

export default parser;
