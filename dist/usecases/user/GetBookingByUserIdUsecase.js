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
exports.GetBookingByUserIdUsecase = void 0;
class GetBookingByUserIdUsecase {
    constructor(ibookingrepository) {
        this.ibookingrepository = ibookingrepository;
    }
    getbookByUserId(userId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error('User ID is required');
            }
            try {
                const { bookings, total } = yield this.ibookingrepository.findBookingsByUserId(userId, skip, limit);
                return { bookings, total };
            }
            catch (error) {
                throw new Error("Failed to fetch booking details");
            }
        });
    }
}
exports.GetBookingByUserIdUsecase = GetBookingByUserIdUsecase;
