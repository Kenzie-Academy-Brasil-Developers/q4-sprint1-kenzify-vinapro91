import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../config/config";
import db from "../config/DB";
import IUser from "../types/IUser";

const deleteSong = async (req: Request, res: Response) => {
  const { artist, song } = req.query;
  if(!req.headers.authorization){
    return res.status(401).json({ message: "Invalid Token." });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decoded = await jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalid Token." });
    }
    return decoded;
  });
  const user: IUser = db.find((user) => decoded.username === user.username);
  delete user.playlist[artist];

  return res.status(204).json();
};

export default deleteSong;
