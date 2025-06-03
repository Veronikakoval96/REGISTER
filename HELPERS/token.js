import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generatetoken = ({_id, name, role}) => {
    return jwt.sign({ id:_id, name, role}, process.env.JWT_PASSWORD,{expiresIn: "1h"} )
}

const verification = (token) =>{
    try{
    return jwt.verify(token, process.env.JWT_PASSWORD)
}catch (error){
    throw new Error("Token no valido")
}
}

export default {generatetoken, verification} 