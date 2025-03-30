import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import notificationRouter from "./routes/notification.route";
import orderRouter from "./routes/order.route";
import analyticRouter from "./routes/analytic.route";
import layoutRouter  from "./routes/layout.route"



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
app.use("/api/v1", courseRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", notificationRouter);
app.use("/api/v1", analyticRouter);
app.use("/api/v1", layoutRouter);



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

