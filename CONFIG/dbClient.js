import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()



 const connectDB = async () => {
    
    try {
        await mongoose.connect(`mongodb+srv://veronikakoval0009:${process.env.PASSWORD}@cluster0.gbpkskl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Conectado con éxito a la BBDD");
    } catch (error) {
        console.log("Error en la conexión de la BBDD");
    }
}
 export default connectDB