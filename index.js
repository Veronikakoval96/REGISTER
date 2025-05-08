import express from "express";
import routesMascotas from "./ROUTES/usuarios.js"
import dotenv from "dotenv"
import connectDB from "./CONFIG/dbClient.js";
connectDB()
dotenv.config()
const app = express()
const PORT = 3000

app.use(express.json())
app.use("/usuarios", routesMascotas)


try {app.listen(PORT, ()=> console.log("Servidor activo"))

} catch(e){
    console.error("Error al conectar servidor")
}