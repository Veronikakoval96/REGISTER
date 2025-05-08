import User from "../MODELS/usuarios.js";
import bcrypt from "bcrypt";
import tokenHelper from "../HELPERS/token.js";

const create = async (req, res) => {
  try {
    const data = new User(req.body);
    const userExist = await User.findOne({ email: data.email });

    if (userExist) {
      return res.status(400).json("Usuario ya existe");
    }

    const userDB = await data.save();
    return res.status(201).json(userDB);
  } catch (e) {
    console.error("Error al crear usuario", e);
    res.status(400).json({ error: e.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await User.find();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json("Error al obtener usuarios");
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    res.status(200).json(data);
    console.log("Usuario obtenido");
  } catch (e) {
    res.status(500).json("Error al obtener usuario");
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json(data);
    console.log("Usuario modificado");
  } catch (e) {
    res.status(500).json("Error al modificar usuario");
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndDelete(id);
    res.status(200).json(data);
    console.log("Usuario eliminado");
  } catch (e) {
    res.status(500).json("Error al eliminar usuario");
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = tokenHelper.generatetoken(user._id);
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    return res.status(400).json("error");
  }
};

export const controller = {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
  login,
};
