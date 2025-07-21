import mongoose from "mongoose";
import User  from "./user.models";

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    desc: { type: String },
    image: { type: String },
    avgRating: { type: Number, default: 0 },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String }
    }
}, { timestamps: true }); 

export const ProviderSchema = mongoose.model("ProviderSchema",serviceProviderSchema);