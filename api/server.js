import express from "express";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import authRoutes from "./routes/auth.js";
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser";
import multer from "multer";


dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV === 'dev'){
    app.use(cors({
        credentials: true,
        origin:process.env.CLIENT_URL
    }))
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname )
    } 
  })
  
  const upload = multer({ storage: storage })

app.use("/api/v1/upload", upload.single("img"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/comments", commentRoutes)
app.use("/api/v1/likes", likeRoutes)
app.use("/api/v1/relationships",relationshipRoutes)

app.listen(8000,() => {
    console.log("API Working")
}) 
