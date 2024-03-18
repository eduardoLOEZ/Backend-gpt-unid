import dotenv from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config()

const generateToken = (user) =>{
    try {
        const token = jwt.sign(user, process.env.SECRET, {expiresIn:"10m"})
        return token;
    } catch (error) {
        console.log(error)
        
    }
}

export default generateToken;