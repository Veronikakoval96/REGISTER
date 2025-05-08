import express from "express";
import { controller } from "../CONTROLLERS/usuarios.js";

const route = express.Router();

route.post("/", controller.create);
route.get("/", controller.getAll);
route.get("/:id", controller.getOne);
route.put("/:id", controller.update);
route.delete("/:id", controller.deleteOne);

route.post("/login", controller.login);

export default route;
