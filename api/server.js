import express from "express";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import authRoutes from "./routes/auth.js";

 
const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/comments", commentRoutes)
app.use("/api/v1/likes", likeRoutes)

app.listen(8000,() => {
    console.log("API Working")
}) 
