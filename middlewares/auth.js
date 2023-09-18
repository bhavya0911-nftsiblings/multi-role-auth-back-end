import { User } from "../models/user.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if(!token) return next(new ErrorHandler("Login First", 404));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    next();
}

export const isAdmin = async (req, res, next) => {
    const isAdmin = req.user.role === "Admin";
    if(!isAdmin) return next(new ErrorHandler("Access Denied", 403));

    next();
}