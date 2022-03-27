import { Request, Response } from "express";

import db from "../config/DB";
import { serializeDb } from "../services/user.services";

const getUsers = (req: Request, res: Response) => {
  const output = serializeDb(db);
  res.status(200).json(output);
};

export default getUsers;
