import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../helpers/generateToken.js";


export const Register = async(req,res)=>{
    try {
        const {email,username, password, rol} = req.body

        if(!(email && username && password)){
            return res.send({message: "Incomplete data provided"})
        }
        const EmailExists = await User.findOne({email})

        if (EmailExists) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            username,
            password: encryptedPassword,
        });

        res.status(201).json({ msg: "User created successfully", data: newUser });
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
        
    }
}


export const Login = async(req,res)=>{
    try {
        const {email, password} = req.body
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ error: "Username or password are incorrect" });
        }

        const isPasswordValid = await bcrypt.compare(password, userFound.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Username or password are incorrect" });
        }

        const token = generateToken({user: userFound})

        return res.status(201).json({
            msg: "Inicio de sesión exitoso",
            token: token,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const LogOut = async (req, res) => {
    try {
      res.status(200).json({
        msg: "Cerró la sesión exitosamente",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Ocurrió un error al intentar cerrar la sesión",
      });
    }
};