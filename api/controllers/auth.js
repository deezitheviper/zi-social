import {db} from "../db.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
    const {username,email,name, password} = req.body;
   

    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[username], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exists")
        const salt = bcrypt.genSaltSync(10);
        const  hash = bcrypt.hashSync(password, salt);
        const values = [
            username,email,name,hash
        ]
        const q = "INSERT INTO users (`username`, `email`,`name`, `password`) VALUES (?)" 
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        })
    })

}