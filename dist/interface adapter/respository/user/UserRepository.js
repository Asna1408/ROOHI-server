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
exports.UserRepository = void 0;
const userModel_1 = require("../../../frameworks/database/models/user/userModel");
const BannerModel_1 = require("../../../frameworks/database/models/admin/BannerModel");
class UserRepository {
    getPaginatedData(model_1, page_1, limit_1) {
        return __awaiter(this, arguments, void 0, function* (model, page, limit, populateFields = []) {
            const skip = (page - 1) * limit;
            const totalRecords = yield model.countDocuments();
            const records = yield model
                .find()
                .skip(skip)
                .limit(limit)
                .populate(populateFields)
                .exec();
            return {
                totalRecords,
                records,
            };
        });
    }
    RegisterUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.create(user);
            }
            catch (error) {
                throw new Error("error occured when creating a user");
            }
        });
    }
    FindByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.findOne({ email: email });
            }
            catch (error) {
                throw new Error("error occured when finding the user");
            }
        });
    }
    GoogleOAuth(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield userModel_1.UserModel.create(user);
                return newUser;
            }
            catch (error) {
                throw new Error("error occured when creating the user through google");
            }
        });
    }
    //for unverified user
    FindByEmailAndDelete(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield userModel_1.UserModel.findOneAndDelete({ email: email });
                if (deleted) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new Error("error occured when deleting the unverified user");
            }
        });
    }
    //for resend otp store  
    UpdateUserOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.UserModel.findOneAndUpdate({ email }, { $set: { otp } }, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error("Error updating OTP:", error);
                return null;
            }
        });
    }
    UpdateVerifiedStatus(email, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.UserModel.findOneAndUpdate({ email }, { $set: { verified: status } }, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error("Error updating verification status:", error);
                return null;
            }
        });
    }
    UpdateUser(email, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.updateOne({ email }, { $set: updateData });
            }
            catch (error) {
                throw new Error("Error occured when updating the user data");
            }
        });
    }
    UpdatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield userModel_1.UserModel.findOneAndUpdate({ email }, {
                    $set: {
                        password: password
                    }
                }, { $new: true });
                if (updated) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new Error("Error Occured when updating the banner");
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.UserModel.findById(userId).select("-password -__v");
                ;
                return user;
            }
            catch (error) {
                throw new Error(`Error fetching user: ${error}`);
            }
        });
    }
    updateProfile(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(userId, updateData, { new: true });
                return updatedUser;
            }
            catch (error) {
                throw new Error(`Error updating profile: ${error}`);
            }
        });
    }
    getActiveBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BannerModel_1.BannerModel.find({ isActive: true });
            }
            catch (error) {
                throw new Error("error occured when finding the banners");
            }
        });
    }
}
exports.UserRepository = UserRepository;
