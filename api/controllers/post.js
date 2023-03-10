import { db } from "../db.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import { userInfo } from "os";

export const getPosts = (req, res, next) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, user) => {
        if(err) return res.status(403).json("Invalid Token")
        const q = userId !== 'undefined' ? `SELECT p.*, u.id AS userId,username,name,avatar FROM posts AS p JOIN users AS u ON (u.id = p.user)
        WHERE p.user = ?` : `SELECT p.*, u.id AS userId,username,name,avatar FROM posts AS p JOIN users AS u ON (u.id = p.user)
        LEFT JOIN relationships AS r ON (p.user = r.followed) WHERE r.follower = ? OR p.user = ? ORDER BY p.createdOn DESC`;
        
        const values = userId !== 'undefined'? [userId] : [user.id, user.id]
        db.query(q, values, (err, data) => {
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
        const {content,imgUrl} = req.body;
        const q = "INSERT INTO posts (`content`, `img`, `createdOn`, `user`) VALUES (?)";
        const values = [
            content,
            imgUrl, 
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userData.id
        ]
        db.query(q,[values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post created successfully");
        })
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, userData) => {

        if(err) return res.status(403).json("Invalid Token")
        const {content,imgUrl} = req.body;
        const q = "DELETE FROM posts WHERE `id`=? AND `user`=?";
        const values = [
           req.params.id,
           userData.id
        ]
        db.query(q,[values], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.affectedRow > 0) return res.status(200).json("Post deleted successfully");   
            return res.status(403).json("You can't delete this post")
        })
    })
}