import express, { Express } from "express";

import userRoutes from "./userRoute";

const routes = (app: Express) => {
  app.use(express.json());
  userRoutes(app);
};

export default routes;
