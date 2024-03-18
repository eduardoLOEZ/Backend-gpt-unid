import express from "express"
import dotenv from 'dotenv';
import cors from "cors"
import connectDB from "./DB/DB.js";
import router from "./routes/Auth.js";
import GPTrouter from "./routes/chatgpt.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(router)
app.use("/gpt", GPTrouter)

app.get("/", (req,res)=>{
    res.send({
        msg:"API-gpt",
        version: "1.0.0",
        author: "Developers"
    })
})

connectDB()

app.listen(port,()=>{
    console.log(`Running Server on port: ${port}`)
})