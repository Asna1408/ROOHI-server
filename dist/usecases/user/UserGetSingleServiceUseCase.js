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
exports.UserGetSingleServiceUseCase = void 0;
class UserGetSingleServiceUseCase {
    constructor(ipostrepository) {
        this.ipostrepository = ipostrepository;
    }
    getsingleservice(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!serviceId) {
                    throw new Error("Service ID is required");
                }
                const service = yield this.ipostrepository.getsingleservice(serviceId);
                return service;
            }
            catch (error) {
                console.error("Error fetching service:", error);
                throw new Error("An error occurred while fetching the service");
            }
        });
    }
}
exports.UserGetSingleServiceUseCase = UserGetSingleServiceUseCase;
