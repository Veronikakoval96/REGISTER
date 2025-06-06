import mongoose from "mongoose";
import dotenv from "dotenv"
import User from "../MODELS/usuarios.js"
import Product from "../MODELS/productos.js"

dotenv.config()

const seedDB = async() =>{
    try{
        await mongoose.connect(`mongodb+srv://veronikakoval0009:${process.env.PASSWORD}@cluster0.gbpkskl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("Conectado a la BBDD")

        await User.deleteMany({})
        await Product.deleteMany({})
        console.log("BBDD limpia")

       

        const user = await User.create({
            "name": "Veronika22",
            "email": "veronika@veronika.com",
            "password": "12345678"
            
        })

        
        console.log("Usuario creado")

        const products = await Product.insertMany([
            {type: "Gorra", price: 10, status: "new", user: user._id},
            {type: "Camiseta", price: 25, status: "new", user: user._id},
            {type: "Mochila", price: 40, status: "used", user: user._id}
        ])

        user.product = products.map(p => p._id)
        await user.save()
        console.log("Producto creado y asociado a User")
    }catch (error){
        console.log("Error al insertar datos", error)
    }finally{
        await mongoose.disconnect()
        console.log("Desconectando de la BBDD")
    }
}

export default seedDB