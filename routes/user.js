import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";
import {
    login,
    register,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/new", isAuthenticated, isAdmin, register);

router.get("/all", isAuthenticated, isAdmin, getAllUsers);
router.get("/me", isAuthenticated, getUser);

router.put("/update/:id", isAuthenticated, isAdmin, updateUser);

router.delete("/delete/:id", isAuthenticated, isAdmin, deleteUser);

export default router;