import { Request, Response, NextFunction } from "express";
import yup from "yup";

const validate =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;
    try {
      await schema.validate(resource);
      next();
    } catch (e: any) {
      res.status(400).json({ error: e.errors.join(", ") });
    }
  };

export default validate;
