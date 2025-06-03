import express from "express"
import usuariosController, { loginController } from "../CONTROLLERS/usuarios.js"
import {checkAuth}  from "../HELPERS/auth.js"
import upload from "../HELPERS/file.js"


const route = express.Router()

route.post("/", upload.single("image"), usuariosController.create)
route.get("/", usuariosController.getAll)
route.get("/:id", usuariosController.getOne)
route.put("/:id", checkAuth, upload.single("image"), usuariosController.update)
route.delete("/:id", checkAuth,  usuariosController.delete)



route.post("/login", loginController)



export default route