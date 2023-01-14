import { db } from "../db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res, next) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, user) => {
        if(err) return res.status(403).json("Invalid Token")
        const q = `SELECT p.*, u.id AS userId,name,avatar FROM posts AS p JOIN users AS u ON (u.id = p.user)
        JOIN relationships AS r ON (p.user = r.followed AND r.follower = ?)`;
        db.query(q,[user.id], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
 
} 

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, userData) => {

        if(err) return res.status(403).json("Invalid Token")
        const {content,img} = req.body;
        const q = "INSERT INTO posts (`content`, `img`, `createdOn`, `user`) VALUES (?)";
        const values = [
            content,
            img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userData.id
        ]
        db.query(q,[values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post created successfully");
        })
    })
}