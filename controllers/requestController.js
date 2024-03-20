import dotenv from "dotenv";
import OpenAI from 'openai';
import User from "../models/User.js";



dotenv.config()

async function gptController(req, res) {
    const { prompt } = req.body;
    const { id } = req.params


    try {
        // Llamado de la función donde se hace la petición a OpenAI
        const responseFromGPT = await getGPTResponse(prompt);

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        user.responses.push(responseFromGPT);
        await user.save();

        // Devolver la respuesta generada por GPT
        return res.status(200).send({ data: responseFromGPT });
    } catch (error) {
        console.error("Error al obtener respuesta de OpenAI:", error);
        return res.status(500).send({ error: "Error interno del servidor" });
    }
}


export const getUserResponses = async (req, res) => {
    const { id } = req.params; // Obtener el ID de usuario de los parámetros de la URL

    try {
        // Buscar al usuario por su ID y obtener su historial de respuestas
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Devolver el historial de respuestas del usuario
        return res.status(200).json({ responses: user.responses });
    } catch (error) {
        console.error("Error al obtener las respuestas del usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};


//------------FUNCION PRINCIPAL PARA HACER LA PETICIÓN A OPENAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

async function getGPTResponse(prompt){
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt }
            ],
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        const message = response.choices[0].message.content;
        // console.log(message);
        return message;
    } catch (error) {
        console.error("Error al obtener respuesta de OpenAI:", error);
        return null;
    }
}

export default gptController;