"use strict";
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
exports.GoogleAuthUseCase = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class GoogleAuthUseCase {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    GoogleAuthLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.UserRepository.FindByEmail(user.email);
                if (existingUser) {
                    if (existingUser.isBlocked) {
                        return "Your account is blocked";
                    }
                    return {
                        existingUser,
                        alreadyRegistered: true,
                    };
                }
                else {
                    // Generate a random password
                    const plainPassword = crypto_1.default.randomBytes(8).toString("hex");
                    // Hash the password using bcrypt
                    const saltRounds = 10;
                    const hashedPassword = yield bcrypt_1.default.hash(plainPassword, saltRounds);
                    // Assign the hashed password to the user object
                    user.password = hashedPassword;
                    const newUser = yield this.UserRepository.GoogleOAuth(user);
                    return newUser;
                }
            }
            catch (error) {
                throw new Error("Error occured when Login through Google");
            }
        });
    }
}
exports.GoogleAuthUseCase = GoogleAuthUseCase;
