import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided."
            });
        }

        const token = authHeader.split(" ")[1];

       const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        });
    }

};

export default verifyToken;