import express from "express";
import userRouter from "./ROUTES/usuarios.js";
import dotenv from "dotenv";
import connectDB from "./CONFIG/dbClient.js";
dotenv.config();

connectDB();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/usuarios", userRouter);

app.listen(PORT, () => console.log("Servidor activo"));
