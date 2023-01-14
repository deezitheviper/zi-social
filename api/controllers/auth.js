import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const login = (req, res) => {

    const {username} = req.body;

    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[username], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found");
        const userpassword = data[0].password
        const checkPassword = bcrypt.compareSync(req.body.password, userpassword)
        if(!checkPassword) return res.status(404).json("Wrong Credentials")

        const token = jwt.sign({
            id:data[0].id},
            "secretkey"
        )
        
        const {password, ...others} = data[0]

        res.cookie("accessToken", token, {
            httpOnly:true,
        }).status(200).json(others)
    })
}