import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config()


export const auth = (req,res,next)=>{
    try {
        const { token } = req.headers;

        jwt.verify(token, process.env.SECRET, (err, user)=>{
            if(err){
                return res
                .status(401)
                .json({ message: "Token is not valid, please Login" });
            }
            req.user = {
                id: new mongoose.Types.ObjectId(user.id)
            }
            next()
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}