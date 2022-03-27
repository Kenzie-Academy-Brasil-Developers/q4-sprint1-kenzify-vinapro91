import { Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import config from "../config/config";
import db from "../config/DB";
import IUser from "../types/IUser";

const addUserInDB = (username: string, hashedPassword: string) => {
  const user: IUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
    playlist: {},
  };
  db.push(user);
  return user;
};

const serializeDb = (db: IUser[]) => {
  const newReturn = [];
  for (let i = 0; i < db.length; i += 1) {
    const user = {
      id: db[i].id,
      username: db[i].username,
      playlist: db[i].playlist,
    };
    newReturn.push(user);
  }
  return newReturn;
};

const serializeUser = (user: IUser) => {
  return {
    id: user.id,
    username: user.username,
    playlist: user.playlist,
  };
};

const verifyUser = (username: string) => {
  const user = db.find((_user) => _user.username === username);
  return user;
};

const generateToken = async (user: IUser) => {
  const token = jwt.sign({ username: user.username }, config.secret, {
    expiresIn: config.expiresIn,
  });
  return token;
};

const normalizeTitle = (title) => {
  return title
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
};


export {
  addUserInDB,
  serializeDb,
  serializeUser,
  verifyUser,
  generateToken,
  normalizeTitle,
};
