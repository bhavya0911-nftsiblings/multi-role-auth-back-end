import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 10000,
        sameSite: process.env.NODE_ENV === "DEV" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEV" ? false: true,
    }).json({
        success: statusCode,
        message,
    });
}

export const successStatus = (res, message, statusCode, extra) => {
    message = message || "Successful Request";
    statusCode = statusCode || 200;
    extra = extra || null;
    if(!(extra === null)) {
        return res.status(statusCode).json({
            success: true,
            message,
            data: extra,
        });
    }
    res.status(statusCode).json({
        success: true,
        message,
    });
}