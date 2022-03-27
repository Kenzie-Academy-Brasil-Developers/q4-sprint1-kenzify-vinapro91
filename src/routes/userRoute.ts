import { Router, Express } from "express";

import createPlaylist from "../controllers/createPlaylist.controller";
import createUser from "../controllers/createUser.controller";
import deleteSong from "../controllers/delete.controller";
import getUsers from "../controllers/getUsers.controller";
import login from "../controllers/login.controller";
import authenticateUser from "../middlewares/authenticateUser.middleware";
import validate from "../middlewares/validateShape.middleware";
import verifyDuplicateUsername from "../middlewares/verifyDuplicateUsername.middleware";
import userSchema from "../models/User.Shape";

const userRoutes = (app: Express) => {
  const route = Router();

  route.get("/", getUsers);

  route.post(
    "/register",
    validate(userSchema),
    verifyDuplicateUsername,
    createUser
  );

  route.post("/login", validate(userSchema), login);

  route.put("/playlist", authenticateUser, createPlaylist);

  route.delete("/playlist", authenticateUser, deleteSong);

  app.use("/users", route);
};
export default userRoutes;
