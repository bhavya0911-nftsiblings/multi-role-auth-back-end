import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/user.js";

export const app = express();

config({
    path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/api/v1/users", userRoutes);

app.use(errorMiddleware);