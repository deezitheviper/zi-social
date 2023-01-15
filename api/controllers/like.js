import { db } from "../db.js";
import jwt from "jsonwebtoken";


export const getLikes = (req, res) => {

        const q = "SELECT user from likes WHERE post = ?";       
        db.query(q,[req.query.postId], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data.map(like => like.user));
        })
}

export const addLike = (req, res) => {
  
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, userData) => {

        if(err) return res.status(403).json("Invalid Token")
        const q = "INSERT INTO likes (`user`, `post`) VALUES (?)";
        const values = [
            userData.id,
            req.body.postId
        ]
        
        db.query(q,[values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Liked successfully");
        })
    })
}

export const removeLike = (req, res) => {
  
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, userData) => {

        if(err) return res.status(403).json("Invalid Token")
        const q = "DELETE FROM likes WHERE `user` = ? AND `post` = ?";
      
        
        db.query(q,[userData.id, req.params.postId], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("unLiked successfully");
        })
    })
}