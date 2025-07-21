import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    desc: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    unit: { type: String, required: true }
}, { timestamps: true });

export const Service = mongoose.model("Service", serviceSchema);
