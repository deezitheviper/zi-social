import { db } from "../db.js";
import jwt from "jsonwebtoken";


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