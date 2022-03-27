import { Request, Response, NextFunction } from "express";

import db from "../config/DB";

const verifyDuplicateUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;

  const user = db.find((_user) => _user.username === username);
  if (user) {
    return res.status(422).json({ message: "username already registered" });
  }
  return next();
};
export default verifyDuplicateUsername;
