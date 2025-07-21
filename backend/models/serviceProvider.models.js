import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    desc: { type: String },
    image: { type: String },
    avgRating: { type: Number, default: 0 },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    }
}, { timestamps: true });

export const Provider = mongoose.model("Provider", serviceProviderSchema);
