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
exports.AdminLoginUseCase = void 0;
class AdminLoginUseCase {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    AdminLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailExist = yield this.adminRepository.LoginAdmin(email);
                if (emailExist && (emailExist === null || emailExist === void 0 ? void 0 : emailExist.password) === password) {
                    return emailExist;
                }
                else {
                    return "Invalid";
                }
            }
            catch (error) {
                throw new Error("Error occured when admin login");
            }
        });
    }
}
exports.AdminLoginUseCase = AdminLoginUseCase;
