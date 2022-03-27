import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { addUserInDB, serializeUser } from "../services/user.services";

const createUser = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const { username } = req.body;
  const user = serializeUser(addUserInDB(username, hashedPassword));
  res.status(201).json({ user });
};

export default createUser;
