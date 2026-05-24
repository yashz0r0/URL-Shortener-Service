const User= require('../models/User');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */

const registerUser=async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
        }

        const existingUser= await User.findOne({email:email});

        if(existingUser){
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);


        const newUser= await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ success: true, data: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }});

    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }

};


const loginUser= async(req,res)=>{

    try{
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user= await User.findOne({email}).select('+password');

        if(!user|| !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const payload={
            user:{
                id:user._id
            },
        };

        const token =jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:'1h'});

        res.status(200).json({ 
            success: true,
            token:token 
        });

    }catch(error){
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
module.exports={
    registerUser,
    loginUser
}