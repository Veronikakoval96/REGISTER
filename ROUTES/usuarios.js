import express from "express"
import usuariosController, { loginController } from "../CONTROLLERS/usuarios.js"


const route = express.Router()

route.post("/", usuariosController.create)
route.get("/", usuariosController.getAll)
route.get("/:id", usuariosController.getOne)
route.put("/:id", usuariosController.upDate)
route.delete("/:id", usuariosController.delete)

route.post("/login", loginController)

export default route