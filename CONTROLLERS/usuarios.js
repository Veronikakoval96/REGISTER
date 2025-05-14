import User from "../MODELS/usuarios.js"
import bcrypt from "bcrypt"
import tokenHelper from "../HELPERS/token.js"
import mongoose from "mongoose"
import {v2 as cloudinary} from "cloudinary"


class usuariosController {
    constructor(){

    }
    async create (req,res){
        try{
            
            const data =  new User(req.body)
            const userExist = await User.findOne({email: data.email})
            
            if (userExist){
                return res.status(400).json("Usuario ya existe")
            }
            if (req.file) {
                console.log("Imagen subida:", req.file);
                data.image = req.file.path; 
            } else {
                console.log("No se ha recibido archivo");
            }

            const userDB = await data.save();
            return res.status(201).json({mensaje:"Usuario creado", user:userDB} )
        } catch (e){
        console.error("Error al crear usuario", e)
        res.status(400).json({ error: e.message})
    }
    }

    async getAll (req,res){
        try{
            const data = await User.find()
            res.status(200).json(data)
            console.log("Usuarios obtenidos")
        } catch (e){
        res.status(500).json("Error al obtener usuarios")
    }
    }

    async getOne (req,res){
        try{
            const {id} = req.params
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error: "ID invalido"})
            }
            console.log("Buscando usuario con ID", id)
            const data = await User.findById(id).populate("product")  
            if (!data){
                return  res.status(404).json({ error: "Usuario no encontrado"})
            } 
               res.status(200).json(data)
            console.log("Usuario obtenido")  

        }catch (e){
            console.error("Error", e)
        return res.status(500).json("Error al obtener usuario")
    }
            
            
    } 
    

    async upDate (req,res){
        try{
            const {id} = req.params

            const Admin= req.user.role === "admin"
            const Own= String(req.user.id) === String(id)
            

            if (!Own && !Admin){
                return res.status(403).json({error: "No estas autorizado para modificar esta cuenta"})
            }
            if (!Admin && req.body.role){
                return res.status(403).json({error: "No estas autorizado para modificar tu rol"})
            }

            
            const data = await User.findById(id)
             if (!data) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
            const imgUrl = data.image

            if (imgUrl){
            const imgSplited = imgUrl.split('/')
            const nameSplited = imgSplited.at(-1).split('.')[0]
            const folderSplited = imgSplited.at(-2);
            const public_id = `${folderSplited}/${nameSplited}`;

    
            await cloudinary.uploader.destroy(public_id)
            console.log('Imagen eliminada en cloudinary')
     }
            if (req.file) {
                console.log("Imagen subida:", req.file);
                req.body.image = req.file.path; 
            } else {
                console.log("No se ha recibido archivo");
            }

            
            const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json(updatedUser)
            console.log("Usuario modificado", updatedUser)
         }catch (e){
            console.log(e)
        res.status(500).json("Error al modificar usuario")
    
    } 
 }


    async delete (req,res){
        try{
            const {id} = req.params
            const Admin= req.user.role === "admin"
            const Own= String(req.user.id) === String(id)

           
            if (req.user.role === "user" && !Own){
                return res.status(403).json({error: "No estas autorizado para eliminar esta cuenta"})
            }

            const data = await User.findById(id)
             if (!data) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
            const imgUrl = data.image

            if (imgUrl){
            const imgSplited = imgUrl.split('/')
            const nameSplited = imgSplited.at(-1).split('.')[0]
            const folderSplited = imgSplited.at(-2);
            const public_id = `${folderSplited}/${nameSplited}`;

    
            await cloudinary.uploader.destroy(public_id)
            console.log('Imagen eliminada en cloudinary')
     }
            const deleteUser = await User.findByIdAndDelete(id)
            console.log("Usuario eliminado")
            res.status(200).json(deleteUser)
            
        }  
        catch (e){
            console.error(e)
        res.status(500).json("Error al eliminar usuario")
    
   
}
    
}}

const login = async (req, res, next)=>{
    
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user){
           return res.status(404).json({ error: "Usuario no encontrado"})
        }
        if (bcrypt.compareSync(password, user.password)){
            const token = tokenHelper.generatetoken({_id: user._id, name: user.name, role: user.role})
            return res.status(200).json({ message: "Logueado", token, user})
        }else { 
             return res. status(400).json("Usuario o contraseña incorrectos")
        }
       
        } 
    
    catch (error) {
        return res.status(400).json("error")
    }
}

export default  new usuariosController()
export const loginController = login