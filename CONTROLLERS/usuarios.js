import User from "../MODELS/usuarios.js"
import bcrypt from "bcrypt"
import tokenHelper from "../HELPERS/token.js"


class usuariosController {
    constructor(){

    }
    async create (req,res){
        try{
            const data =  await User.create(req.body)
            const userExist = await User.findOne({email: data.email})
            res.status(201).json({mensaje: "Usuario creado", data} )
            if (userExist){
                return res.status(400).json("Usuario ya existe")
            }
            const userDB = await data.save()
            return res.status(201).json(userDB)
        } catch (e){
        console.error("Error al crear usuario", e)
        res.status(500).json({ error: e.message})
    }
    }

    async getAll (req,res){
        try{
            const data = await User.find()
            res.status(201).json(data)
            console.log("Usuarios obtenidos")
        } catch (e){
        res.status(500).json("Error al obtener usuarios")
    }
    }

    async getOne (req,res){
        try{
            const {id} = req.params
            const data = await User.findById(id)
            res.status(201).json(data)
            console.log("Usuario obtenido")
        } catch (e){
        res.status(500).json("Error al obtener usuario")
    }
    }

    async upDate (req,res){
        try{
            const {id} = req.params
            const data = await User.findByIdAndUpdate(id, req.body)
            res.status(201).json(data)
            console.log("Usuario modificado")
        } catch (e){
        res.status(500).json("Error al modificar usuario")
    }
    }

    async delete (req,res){
        try{
            const {id} = req.params
            const data = await User.findByIdAndDelete(id)
            res.status(201).json(data)
            console.log("Usuario eliminado")
        } catch (e){
        res.status(500).json("Error al eliminar usuario")
    }
    }
}

const login = async (req, res, next)=>{
    
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user){
           
        }
        if (bcrypt.compareSync(password, user.password)){
            const token = tokenHelper.generatetoken(user._id)
            return res.status(200).json({token,user})
            

        }else{ 
             return res. status(400).json("Usuario o contraseña incorrectos")
        }
    }catch (error) {
        return res.status(400).json("error")
    }
}

export default  new usuariosController()
export const loginController = login