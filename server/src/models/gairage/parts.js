import mongoose from "mongoose";

const partSchema = new mongoose.Schema(
  {
    sellBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name: {
      type: String,
      required: [true, "Part name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      enum: ["Engine", "Brakes", "Electrical", "Filters", "Tires", "Accessories", "Other"],
      default: "Other",
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    compatibility: {
      type: String,
      required: [true, "Car compatibility is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 1,
    },
    stock: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String, // Cloudinary or image URL
      required: [true, "Product image is required"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: String,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Part", partSchema);
