import { NextFunction } from "express";
import { Tokenservice } from "./ITokenservice";
import { Next, Req, Res } from "../../Types/servertype";
import jwt from "jsonwebtoken";
import {Errors} from "../../../entities/utils/Error";

const errorFun = new Errors();

export class JwtTokenAdapter implements Tokenservice {

  async createJwtToken(req: Req,res: Res,next: NextFunction): Promise<void | NextFunction> {
    try {
      
      const token = await jwt.sign(
        { email: req.body.email },
        "jwtsecret" as string,
        { expiresIn: "600m" }
      );

      req.body.token = token;
      next();
    } catch (error) {
      next(errorFun.errorHandler(500, "Token creation failed"));
    }
  }

  async verifyToken(req: Req,res: Res,next: NextFunction): Promise<void | NextFunction> {
    const token = req.cookies.access_token;

    if (!token) {
      return next(errorFun.errorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, "jwtsecret" as string, (err: any, user: any) => {
      if (err) {
        return next(errorFun.errorHandler(401, "Unauthorized"));
      }

      req.body.user = user;
      next();
    });
  }

  async removeToken(req: Req, res: Res): Promise<void> {
    try {
      res.clearCookie("access_token");
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}