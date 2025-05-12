import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generatetoken = ({_id, name, role}) => {
    return jwt.sign({ id:_id, name, role}, process.env.JWT_PASSWORD)
}

const verification = (token) =>{
    return jwt.verify(token, process.env.JWT_PASSWORD)
}

export default {generatetoken, verification} 