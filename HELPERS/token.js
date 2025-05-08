import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generatetoken = (id, name) => {
    return jwt.sign({ id, name}, process.env.JWT_PASSWORD)
}

const verification = (token) =>{
    return jwt.verify(token, process.env.JWT_PASSWORD)
}

export default {generatetoken, verification} 