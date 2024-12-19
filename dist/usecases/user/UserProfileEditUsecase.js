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
exports.UserProfileEditUsecase = void 0;
class UserProfileEditUsecase {
    constructor(iuserrepository) {
        this.iuserrepository = iuserrepository;
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.iuserrepository.getUserById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            }
            catch (error) {
                throw new Error(`Error in GetUserByIdUseCase: ${error}`);
            }
        });
    }
    EditProfile(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.iuserrepository.updateProfile(userId, updateData);
                return updatedUser;
            }
            catch (error) {
                throw new Error(`Error in Updating the UserDetail: ${error}`);
            }
        });
    }
}
exports.UserProfileEditUsecase = UserProfileEditUsecase;
