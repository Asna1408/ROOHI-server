"use strict";
// import { NextFunction } from "express";
// import { Tokenservice } from "./ITokenservice";
// import { Next, Req, Res } from "../../Types/servertype";
// import jwt from "jsonwebtoken";
// import {Errors} from "../../../entities/utils/Error";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenAdapter = void 0;
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_1 = require("../../../entities/utils/Error");
const userModel_1 = require("../../database/models/user/userModel");
const errorFun = new Error_1.Errors();
class JwtTokenAdapter {
    createJwtToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create Access Token
                const accessToken = yield jsonwebtoken_1.default.sign({ email: req.body.email }, "jwtsecret", { expiresIn: "600m" } // 10 hours expiration time for the access token
                );
                // Create Refresh Token (longer expiration time)
                const refreshToken = yield jsonwebtoken_1.default.sign({ email: req.body.email }, "refreshsecret", { expiresIn: "30d" } // 30 days expiration time for the refresh token
                );
                req.body.token = accessToken;
                req.body.refreshToken = refreshToken; // Add refresh token to request body
                next();
            }
            catch (error) {
                next(errorFun.errorHandler(500, "Token creation failed"));
            }
        });
    }
    // Refresh Token Handling
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refresh_token || req.headers["x-refresh-token"];
                if (!refreshToken) {
                    return next(errorFun.errorHandler(401, "Refresh token is missing"));
                }
                jsonwebtoken_1.default.verify(refreshToken, "refreshsecret", (err, user) => {
                    if (err) {
                        return next(errorFun.errorHandler(401, "Unauthorized"));
                    }
                    // If refresh token is valid, generate a new access token
                    const newAccessToken = jsonwebtoken_1.default.sign({ email: user.email }, "jwtsecret", { expiresIn: "600m" });
                    res.json({ accessToken: newAccessToken });
                });
            }
            catch (error) {
                next(errorFun.errorHandler(500, "Token refresh failed"));
            }
        });
    }
    // async verifyToken(req: Req, res: Res, next: NextFunction): Promise<void | NextFunction> {
    //   const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
    //   if (!token) {
    //     return next(errorFun.errorHandler(401, "Unauthorized"));
    //   }
    //   jwt.verify(token, "jwtsecret" as string, (err: any, user: any) => {
    //     if (err) {
    //       return next(errorFun.errorHandler(401, "Unauthorized"));
    //     }
    //     req.body.user = user;
    //     next();
    //   });
    // }
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = req.cookies.access_token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
            if (!token) {
                return next(errorFun.errorHandler(401, "Unauthorized"));
            }
            try {
                // Decode the token and extract the payload
                const decoded = jsonwebtoken_1.default.verify(token, "jwtsecret");
                console.log(decoded, "😊😊😊😊😊"); // Logs the decoded payload (e.g., { email: 'user@example.com', iat: ..., exp: ... })
                // Extract email
                const email = decoded.email;
                console.log(email, "👍👍👍👍👍👍👍");
                // Fetch user details using the email
                const user = yield userModel_1.UserModel.findOne({ email }); // Adjust based on your repository or database layer
                console.log(user, "👍👍👍👍👍👍👍");
                if (!user) {
                    return next(errorFun.errorHandler(404, "User not found"));
                }
                console.log(user, "🎉🎉🎉 User details fetched");
                // Add user details to request object for further processing
                req.body.user = user;
                if (user.isBlocked) {
                    console.log("user is blocked");
                    res.status(403).json({ message: "user is blocked" });
                    return;
                }
                next();
            }
            catch (error) {
                console.error("Token verification failed:", error);
                return next(errorFun.errorHandler(401, "Unauthorized"));
            }
        });
    }
    removeToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("access_token");
                res.clearCookie("refresh_token");
                res.status(200).json({ message: "success" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.JwtTokenAdapter = JwtTokenAdapter;
