import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const isAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token; // Token is automatically sent by the browser from the cookies

        if (!token) {
            console.log("Not Authorized");
            return res.status(401).json({ message: "Not Authorized" });
        }

        const decodedToken = jwt.verify(token, process.env.Secret_Key); // Verify token

        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid Token. Please Re-Login" });
        }

        req.user = await User.findById(decodedToken.id); // Get the user from the decoded token

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        res.status(401).json({ message: "Invalid Token. Please Login" });
    }
};

export default isAuth;
