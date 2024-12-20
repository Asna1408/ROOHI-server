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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetPostByIdUsecase = void 0;
class UserGetPostByIdUsecase {
    constructor(ipostrepository) {
        this.ipostrepository = ipostrepository;
    }
    getPostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ipostrepository.getPostById(postId);
            }
            catch (error) {
                console.error("Error fetching post by ID:", error);
                throw new Error("An error occurred while fetching the post. Please try again later.");
            }
        });
    }
}
exports.UserGetPostByIdUsecase = UserGetPostByIdUsecase;
