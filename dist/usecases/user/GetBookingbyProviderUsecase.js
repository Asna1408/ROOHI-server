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
exports.GetBookingbyProviderUsecase = void 0;
class GetBookingbyProviderUsecase {
    constructor(ibookingrepository) {
        this.ibookingrepository = ibookingrepository;
    }
    getProviderBookings(providerId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!providerId) {
                throw new Error('Provider ID not found');
            }
            try {
                const { bookings, total } = yield this.ibookingrepository.getBookingsByProviderId(providerId, skip, limit);
                return { bookings, total };
            }
            catch (error) {
                throw new Error("Failed in fetching the details");
            }
        });
    }
}
exports.GetBookingbyProviderUsecase = GetBookingbyProviderUsecase;
