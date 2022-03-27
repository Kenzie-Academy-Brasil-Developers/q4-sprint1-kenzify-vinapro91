import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "../config/config";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Missing authorization" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, config.secret, (err) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalid Token." });
    }
    return next();
  });
};

export default authenticateUser;
