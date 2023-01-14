import { db } from "../db";

export const getComments = (req, res, next) => {
    const {postId} = req.params;
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Not authorized");
    jwt.verify(token, "secretkey", (err, user) => {
        if(err) return res.status(403).json("Invalid Token")
        const q = `SELECT c.*, u.id AS userId,name,avatar FROM comments AS c JOIN users AS u ON (u.id = c.user)
        WHERE c.post = ? ORDER BY c.createdOn DESC`;
        db.query(q,[postId], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
 
}