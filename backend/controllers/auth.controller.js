import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const registerUser = async(req, res) =>{
    try{
        const {name, fullname, email, password, phone} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser =  new User({
            username:name,
            email,
            fullname,
            phone,
            password: hashedPassword
        })
        await newUser.save();
        console.log(newUser)

        res.status(201).json({message:'User registered successfully'});
    }catch(error){
        res.status(500).json({message:error});
    }
};


const loginUser = async(req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:"User not found"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ 
            message: 'Login successful',
            token, 
            user:{
                id:user._id,
                name: user.name,
                email: user.email,
                role: user.role
        } });
    }catch(error){
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};


const logoutUser = async(req,res)=>{
    res.status(200).json({ message: 'Logged out successfully' });
}

export {loginUser, registerUser, logoutUser};

