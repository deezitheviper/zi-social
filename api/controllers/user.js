import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, userData) => {
        if(err) return res.status(403).json("Invalid Token")
        const q = "SELECT * FROM users WHERE username=?";
        const user = req.params.id;
 
        db.query(q,[user], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data[0]){
            const {password, ...info} = data[0];
            
            return res.status(200).json(info); 
            }
        })
    })
}