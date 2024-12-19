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
exports.UserProfileController = void 0;
class UserProfileController {
    constructor(iusereditprofileusecase) {
        this.iusereditprofileusecase = iusereditprofileusecase;
    }
    editProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const updateData = req.body;
            try {
                const updatedUser = yield this.iusereditprofileusecase.EditProfile(userId, updateData);
                if (!updatedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            try {
                const user = yield this.iusereditprofileusecase.getUserById(userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
}
exports.UserProfileController = UserProfileController;
