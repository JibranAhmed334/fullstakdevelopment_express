import express from "express"
import "dotenv/config"
import cors from "cors"
import morgan from "morgan"
import connectDb from "./config/db.config.mjs"
import authRouter from "./routes/auth.route.mjs"
import cookieParser from "cookie-parser"
import categoryRouter from "./routes/category.route.mjs"
import productRouter from "./routes/product.route.mjs"
import uploads from "./midlleware/uplods.mjs"
import upload_on_cloudinary from "./utils/cloudinary.utils.mjs"

const app = express()
const port = process.env.PORT

 await connectDb()
app.use(express.json())

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))
app.use(morgan("tiny"))
app.use(cookieParser())




app.post("/uploads", uploads.single("file"), async (request, response) => {
    console.log("file uploaded successfully", request.file);
    const cloud_image =  await upload_on_cloudinary(request.file.path)
console.log("cloud_image:",cloud_image)


    return response.status(200).json({
        message: "File uploaded successfully",
        secure_url: cloud_image.secure_url,
        public_id: cloud_image.public_id
    });
}); 

app.use("/api/auth", authRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter)

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})
