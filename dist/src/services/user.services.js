"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const DB_1 = __importDefault(require("../config/DB"));
const addUserInDB = (username, hashedPassword) => {
    const user = {
        id: (0, uuid_1.v4)(),
        username,
        password: hashedPassword,
        playlist: {},
    };
    DB_1.default.push(user);
    return user;
};
exports.default = addUserInDB;
