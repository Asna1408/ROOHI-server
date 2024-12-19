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
exports.CreateReviewUsecase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class CreateReviewUsecase {
    constructor(ireviewrepository, ibookingrepository) {
        this.ireviewrepository = ireviewrepository;
        this.ibookingrepository = ibookingrepository;
    }
    createReview(userId, serviceId, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.isValidObjectId(userId) || !mongoose_1.default.isValidObjectId(serviceId)) {
                throw new Error("Invalid userId or serviceId provided");
            }
            try {
                const booking = yield this.ibookingrepository.getBookingByUserAndService(userId, serviceId);
                if (!booking) {
                    throw new Error("No booking found for this user and service");
                }
                // const currentDate = new Date();
                // const bookingDate = new Date(booking.booking_date);  
                // if (currentDate < bookingDate) {
                //   console.log("review can only be submitted after service done")
                //     throw new Error("Cannot leave a review after the booking date");
                // }
                return this.ireviewrepository.createReview(userId, serviceId, rating, review);
            }
            catch (error) {
                throw new Error("Error occured when creating review");
            }
        });
    }
}
exports.CreateReviewUsecase = CreateReviewUsecase;
