import dotenv from "dotenv";
import OpenAI from 'openai';

dotenv.config()

async function gptController(req,res){

    const { prompt } = req.body

    try {
        //llamado de la funcion donde se hace la petición 
        const responseFromGPT = await getGPTResponse(prompt)
        return res.status(200).send({data: responseFromGPT})
    } catch (error) {
        console.error("Error al obtener respuesta de OpenAI:", error);
        return res.status(500).send({ error: "Error interno del servidor" });
    }

}




//------------FUNCION PRINCIPAL PARA HACER LA PETICIÓN A OPENAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

async function getGPTResponse(prompt){
    try {
        const response = await openai.completions.create({
            model: "davinci-codex", // Usar el modelo davinci-codex para obtener respuestas más completas y bien desarrolladas
            prompt: prompt,
            max_tokens: 2048,
            temperature: 0.7,
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