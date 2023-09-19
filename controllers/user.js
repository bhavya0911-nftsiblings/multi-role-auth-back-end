import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie, successStatus } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if(!user) return next(new ErrorHandler("Invalid Email or Password", 400));

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));
        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ email });
        if(user) return next(new ErrorHandler("User Already Exist", 404));

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword, role });
        successStatus(res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
}

export const logOut = async (req, res, next) => {
    res.status(200)
    .cookie("token", "", {
        expire: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "DEV" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEV" ? false : true,
    })
    .json({
        success: true,
        user: req.user,
    })
}

export const getAllUsers = async (req, res, next) => {
    try {
        let users = await User.find({});
        successStatus(res, null, 200, users);
    } catch (error) {
        next(error);
    }
}

export const getUser = (req, res, next) => {
    successStatus(res, null, 200, req.user);
}

export const updateUser = async (req, res, next) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        user.role = role;
        user.lastUpdated = Date.now();
        await user.save();
        successStatus(res, "User Role Updated", 200);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser) return next(new ErrorHandler("User not found", 404));
        successStatus(res, "User Deleted", 200);
    } catch (error) {
        next(error);
    }
}