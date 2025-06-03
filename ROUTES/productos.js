import ProductosController from "../CONTROLLERS/productos.js"
import express from "express"
import upload from "../HELPERS/file.js"
import { checkAuth } from "../HELPERS/auth.js"

const productRoute = express.Router()

productRoute.post("/", checkAuth, upload.single("image"), ProductosController.create)
productRoute.get("/:id", ProductosController.getOne)
productRoute.get("/", ProductosController.getAll)
productRoute.put("/:id",checkAuth, upload.single("image"), ProductosController.update)
productRoute.delete("/:id",checkAuth, ProductosController.delete)

export default productRoute