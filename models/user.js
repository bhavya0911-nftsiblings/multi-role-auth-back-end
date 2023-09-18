import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: "String",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
        select: false,
    }
});

export const User = mongoose.model("User", schema);