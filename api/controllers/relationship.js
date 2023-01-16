import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getRelationships = (req,res)=>{
    const q = "SELECT follower FROM relationships WHERE followed = ?";
    db.query(q, [req.query.followed], (err, data) => {
        
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(relationship=>relationship.follower));
    });
}



export const addRelationship = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO relationships (`follower`,`followed`) VALUES (?)";
    const values = [
      userInfo.id,
      parseInt(req.body.userId)
    ];
    db.query(q, [values], (err, data) => {
       
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

export const deleteRelationship = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM relationships WHERE `follower` = ? AND `followed` = ?";

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed");
    });
  });
};