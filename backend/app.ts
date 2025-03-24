import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";



export const app = express();
// cross origin resource sharing
app.use(cors({
    origin:process.env.ORIGIN   
}));
// body parser
app.use(express.json({limit: '50mb'}));
//cookieParser
app.use(cookieParser());

//routes
app.use("/api/v1", userRouter);

//testing api 
app.get("/test", (req, res) => {

    res.status(200).json({
        success: true,
        message: "api is working"
    })
});

// unknown routes
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
});

