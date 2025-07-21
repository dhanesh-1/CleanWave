import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique: true,
            trim:true
        },

        fullname:{
            type: String,
            required: true,
            trim: true,
        },

        email:{
            type:String,
            required:true,
            unique: true,
            trim:true
        },

        phone:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },

        password:{
            type:String,
            required: [true, 'Password is required'],
            trim:true
        },

        photo:{
            type:String,
        },

        role:{
            type:String,
            enum:['Customer','Service','Admin'],
            default:'Customer'
        },
        
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            pincode: { type: String }
        },
    }, {timestamps: true})

export const User = mongoose.model("User",UserSchema);