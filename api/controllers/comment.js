import { db } from "../db.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getComments = (req, res, next) => {
    const {postId} = req.query;
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, user) => {
        if(err) return res.status(403).json("Invalid Token")
        const q = `SELECT c.*, u.id AS userId,name,avatar FROM comments AS c JOIN users AS u ON (u.id = c.user)
        WHERE c.post = ? ORDER BY c.createdAt DESC`;
        db.query(q,[postId], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
 
}

export const addComment = (req, res) => {
  
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, userData) => {

        if(err) return res.status(403).json("Invalid Token")
       const {comment, postId} = req.body;
        const q = "INSERT INTO comments(`content`, `createdAt`,`post`, `user`) VALUES (?)";
        const values = [
            comment,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            postId,
            userData.id
        ]
        
        db.query(q,[values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Comment created successfully");
        })
    })
}