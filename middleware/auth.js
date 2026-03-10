import jwt from "jsonwebtoken";

export const verifyToken = ( req ) => {
    const authHeader = req.headers.get("authorization");
    if(!authHeader){
        console.error("LOGGIN REQUIRED");
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        throw new Error("INVALID TOKEN");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; 
}