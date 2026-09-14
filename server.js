import express from "express"
import "dotenv/config"
import cors from "cors"
import morgan from "morgan"
import connectDb from "./config/db.config.mjs"
import authRouter from "./routes/auth.route.mjs"
import cookieParser from "cookie-parser"

const app = express()
const port = process.env.PORT

connectDb()
app.use(express.json())

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))
app.use(morgan("tiny"))
app.use(cookieParser())


app.use("/api/auth", authRouter)

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})
