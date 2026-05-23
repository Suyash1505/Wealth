import jwt from "jsonwebtoken";

export const verifyToken = (req) => {

    try {

        // GET AUTH HEADER
        const authHeader = req.headers.get("authorization");

        // CHECK IF HEADER EXISTS
        if (!authHeader) {
            throw new Error("LOGIN REQUIRED");
        }

        // CHECK BEARER FORMAT
        if (!authHeader.startsWith("Bearer ")) {
            throw new Error("INVALID AUTHORIZATION FORMAT");
        }

        // EXTRACT TOKEN
        const token = authHeader.split(" ")[1];

        // CHECK TOKEN
        if (!token) {
            throw new Error("TOKEN MISSING");
        }

        // CHECK JWT SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET IS MISSING");
        }

        // VERIFY TOKEN
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // RETURN USER ID
        return decoded.id;

    } 
    catch (error) {

        console.error("TOKEN VERIFICATION ERROR:", error.message);

        throw new Error("UNAUTHORIZED ACCESS");
    }
};