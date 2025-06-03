import jwt from "jsonwebtoken"

export const checkAuth = (req, res, next) => {
    const token= req.headers["authorization"]?.split(" ")[1]
    if (!token){
        return res.status(401).json({ error: "No hay token"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD)
        req.user = decoded
        
        next()
    }catch (error){
        return res. status(401).json({ error: "Token no valido"})
    }
}







