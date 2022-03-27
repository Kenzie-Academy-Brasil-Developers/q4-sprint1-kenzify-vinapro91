"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUser_controller_1 = __importDefault(require("../controllers/createUser.controller"));
const userRoutes = (app) => {
    const route = (0, express_1.Router)();
    route.post("/register", createUser_controller_1.default);
    app.use("/user", route);
};
exports.default = userRoutes;
