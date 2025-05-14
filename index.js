import express from "express";
import routesUsuarios from "./ROUTES/usuarios.js"
import dotenv from "dotenv"
import productRoute from "./ROUTES/productos.js";
import connectDB from "./CONFIG/dbClient.js";
import { v2 as cloudinary } from 'cloudinary';


dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.CLOUD_SECRET,
    api_key: process.env.CLOUD_KEY
})

connectDB()

const app = express()
const PORT = 3000

app.use(express.json())
app.use("/usuarios", routesUsuarios)
app.use("/productos", productRoute)


 app.listen(PORT, ()=> console.log("Servidor activo"));
