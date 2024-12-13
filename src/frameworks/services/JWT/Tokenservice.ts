// import { NextFunction } from "express";
// import { Tokenservice } from "./ITokenservice";
// import { Next, Req, Res } from "../../Types/servertype";
// import jwt from "jsonwebtoken";
// import {Errors} from "../../../entities/utils/Error";

// const errorFun = new Errors();

// export class JwtTokenAdapter implements Tokenservice {

//   async createJwtToken(req: Req,res: Res,next: NextFunction): Promise<void | NextFunction> {
//     try {
      
//       const token = await jwt.sign(
//         { email: req.body.email },
//         "jwtsecret" as string,
//         { expiresIn: "600m" }
//       );

//       req.body.token = token;
//       next();
//     } catch (error) {
//       next(errorFun.errorHandler(500, "Token creation failed"));
//     }
//   }

//   async verifyToken(req: Req,res: Res,next: NextFunction): Promise<void | NextFunction> {

//     const token = req.cookies.access_token|| req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return next(errorFun.errorHandler(401, "Unauthorized"));
//     }

//     jwt.verify(token, "jwtsecret" as string, (err: any, user: any) => {
//       if (err) {
//         return next(errorFun.errorHandler(401, "Unauthorized"));
//       }

   
//       req.body.user = user;
//       next();
//     });
//   }

//   async removeToken(req: Req, res: Res): Promise<void> {
//     try {
//       res.clearCookie("access_token");
//       res.status(200).json({ message: "success" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// }

import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { Tokenservice } from "./ITokenservice";
import { Next, Req, Res } from "../../Types/servertype";
import { Errors } from "../../../entities/utils/Error";

const errorFun = new Errors();

export class JwtTokenAdapter implements Tokenservice {
  async createJwtToken(req: Req, res: Res, next: NextFunction): Promise<void | NextFunction> {
    try {
      // Create Access Token
      const accessToken = await jwt.sign(
        { email: req.body.email },
        "jwtsecret" as string,
        { expiresIn: "600m" } // 10 hours expiration time for the access token
      );
      
      // Create Refresh Token (longer expiration time)
      const refreshToken = await jwt.sign(
        { email: req.body.email },
        "refreshsecret" as string,
        { expiresIn: "30d" } // 30 days expiration time for the refresh token
      );
      
      req.body.token = accessToken;
      req.body.refreshToken = refreshToken; // Add refresh token to request body
      next();
    } catch (error) {
      next(errorFun.errorHandler(500, "Token creation failed"));
    }
  }

  // Refresh Token Handling
  async refreshToken(req: Req, res: Res, next: NextFunction): Promise<void | NextFunction> {
    try {
      const refreshToken = req.cookies.refresh_token || req.headers["x-refresh-token"];

      if (!refreshToken) {
        return next(errorFun.errorHandler(401, "Refresh token is missing"));
      }

      jwt.verify(refreshToken, "refreshsecret" as string, (err: any, user: any) => {
        if (err) {
          return next(errorFun.errorHandler(401, "Unauthorized"));
        }

        // If refresh token is valid, generate a new access token
        const newAccessToken = jwt.sign(
          { email: user.email },
          "jwtsecret" as string,
          { expiresIn: "600m" }
        );

        res.json({ accessToken: newAccessToken });
      });
    } catch (error) {
      next(errorFun.errorHandler(500, "Token refresh failed"));
    }
  }

  async verifyToken(req: Req, res: Res, next: NextFunction): Promise<void | NextFunction> {
    const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

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
      res.clearCookie("refresh_token");
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
