
import {v2 as cloudinary} from "cloudinary"
import Product from "../MODELS/productos.js"
import User from "../MODELS/usuarios.js"
import mongoose from "mongoose"



class ProductsController {
    constructor(){

    }
    async create (req,res){
        try{
            const userId= req.user.id
            
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return res.status(400).json({error: "ID  usuario no valido"})
            }
            const producto =  new Product({...req.body, user:userId} )
            
            if (req.file) {
                console.log("Imagen subida:", req.file);
                producto.image = req.file.path; 
            } else {
                console.log("No se ha recibido archivo");
            }
           
            const productSaved = await producto.save()
            const user = await User.findById(userId)
            
            if(!user){
                return res.status(404).json({error: "Usuario no encontradossss"})
            }
            user.product.push(productSaved._id)
            await user.save()
            return res.status(201).json({mensaje:"Producto creado", productSaved} )
        } catch (e){
        console.error("Error al crear produto", e)
        res.status(400).json({ error: e.message})
    }
    }

    async getAll (req,res){
            try{
                
                const product = await Product.find().populate("user")
                console.log("Usuarios obtenidos")
                return res.status(200).json(product)
                 
            } catch (e){
            res.status(500).json("Error al obtener productos")
        }
        }

    async getOne (req,res){
        try{
            const {id} = req.params;
            const product = await Product.findById(id).populate("user")
            return res.status(200).json(product)
        }catch(error){
            return res.status(400).json("No se han podido obtener el producto")
        }
            
            
    } 
    

    async update (req,res){
        try{
            const {id} = req.params
            const producto = await Product.findById(id)

            if(!producto){
                return res.status(400).json({error: "Producto no encontrado"})
            }
            const Admin= req.user.role === "admin"
            const Own= String(req.user.id) === String(producto.user)
           

            if (!Own && !Admin){
                return res.status(403).json({error: "No estas autorizado para modificar este producto"})
            }

        
            const imgUrl = producto.image

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

            
            const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json(updatedProduct)
            console.log("Producto modificado", updatedProduct)
         }catch (e){
            console.log(e)
        res.status(500).json("Error al modificar producto")
    
    } 
 }


    async delete (req,res){
        try{
            const {id} = req.params
            
            const producto = await Product.findById(id)
             if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const Admin= req.user.role === "admin"
            const Own= String(req.user.id) === String(producto.user)
           

            if (!Own && !Admin){
                return res.status(403).json({error: "No estas autorizado para modificar este producto"})
            }
            const imgUrl = producto.image

            if (imgUrl){
            const imgSplited = imgUrl.split('/')
            const nameSplited = imgSplited.at(-1).split('.')[0]
            const folderSplited = imgSplited.at(-2);
            const public_id = `${folderSplited}/${nameSplited}`;

    
            await cloudinary.uploader.destroy(public_id)
            console.log('Imagen eliminada en cloudinary')
     }
            const deleteProduct = await Product.findByIdAndDelete(id)
            console.log("Producto eliminado")
            res.status(200).json(deleteProduct)
            
        }  
        catch (e){
            console.error(e)
        res.status(500).json("Error al eliminar producto")
    
   
}
    
}}

export default new ProductsController()