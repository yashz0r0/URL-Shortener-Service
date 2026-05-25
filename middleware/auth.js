const jwt= require('jsonwebtoken');

const auth=async(req,res, next)=>{
    const token = req.header('x-auth-token');

    if(!token){
        return next();
    }

    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoded.user;
        next();

    }catch(error){
        console.error('Error in auth middleware:', error);
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

module.expoets=auth;