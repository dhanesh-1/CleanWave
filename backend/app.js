import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
// import routes from "./routes/index.routes"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}))
app.use(express.json())

app.use('/auth', authRoutes);
app.use('/user',userRoutes);

app.get('/', (req, res)=>{
    res.send("Hello world!!!");
})

app.use((err, req, res, next) => {
    console.error("ERROR: ", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const errors = err.errors || [];
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
});

export { app };