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
exports.UserGetAllPostUseCase = void 0;
class UserGetAllPostUseCase {
    constructor(ipostrepository) {
        this.ipostrepository = ipostrepository;
    }
    GetAllPost(providerId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!providerId) {
                throw new Error("Provider ID is required");
            }
            try {
                return yield this.ipostrepository.getServicesByProvider(providerId, skip, limit);
            }
            catch (error) {
                throw new Error("Error getting services for user");
            }
        });
    }
}
exports.UserGetAllPostUseCase = UserGetAllPostUseCase;
