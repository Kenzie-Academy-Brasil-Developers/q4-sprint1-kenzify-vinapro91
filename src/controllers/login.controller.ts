import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { generateToken, verifyUser } from "../services/user.services";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = verifyUser(username);
  if (!user) {
    return res.status(401).json({ message: "Wrong credentials. Try again!" });
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Wrong credentials. Try again!" });
  }
  const token = await generateToken(user);

  return res.status(200).json({
    accessToken: token,
  });
};

export default login;
