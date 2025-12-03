import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const ab = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(400).json({ message: "Unauthorized token" });
      }

      const decoded = jwt.verify(token, config.token as string) as JwtPayload;

      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
