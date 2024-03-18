import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DB_URL } = process.env;
// console.log(DB_URL); // Verifica que DB_URL tenga un valor aquí


const connectDB = async() =>{
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB establecida');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        
        
    }
}
export default connectDB;