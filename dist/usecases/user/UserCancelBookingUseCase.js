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
exports.UserCancelBookingUseCase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stripe_1 = __importDefault(require("stripe"));
const ServicesModel_1 = require("../../frameworks/database/models/user/ServicesModel");
const date_fns_1 = require("date-fns");
class UserCancelBookingUseCase {
    constructor(ibookingrepository, stripeSecretKey) {
        this.ibookingrepository = ibookingrepository;
        this.stripeSecretKey = stripeSecretKey;
        this.REFUND_TIME_LIMIT_HOURS = 48; // User cancellation time limit for full refund
        this.PARTIAL_REFUND_PERCENTAGE = 0.5; // 50% refund if canceled late
        this.stripe = new stripe_1.default(this.stripeSecretKey);
    }
    cancelBooking(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookingIdString = typeof bookingId === 'string' ? bookingId : bookingId.toString();
            const booking = yield this.ibookingrepository.getBookingById(new mongoose_1.default.Types.ObjectId(bookingIdString));
            if (!booking) {
                throw new Error("Booking not found");
            }
            yield this.ibookingrepository.updateBookingStatus(bookingIdString, 'canceled');
            const updateResult = yield ServicesModel_1.ServiceModel.updateOne({ _id: booking.service_id }, { $addToSet: { availability: booking.booking_date } });
            console.log("Service availability update result:", updateResult);
            if (updateResult.modifiedCount > 0) {
                console.log("Canceled date re-added to availability successfully.");
            }
            else {
                console.warn("Canceled date was already available.");
            }
            const hoursUntilBooking = (0, date_fns_1.differenceInHours)(new Date(booking.booking_date), new Date());
            const refundAmount = hoursUntilBooking >= this.REFUND_TIME_LIMIT_HOURS
                ? booking.amount // Full refund
                : booking.amount * this.PARTIAL_REFUND_PERCENTAGE; // 50% refund
            // Refund the payment through Stripe
            if (booking.paymentIntentId) {
                try {
                    // Refund the payment via Stripe    
                    const refund = yield this.stripe.refunds.create({
                        payment_intent: booking.paymentIntentId,
                        amount: Math.round(refundAmount * 100),
                    });
                    console.log("Refund successful:", refund.id);
                }
                catch (err) {
                    console.error("Refund error:", err);
                    throw new Error("Failed to process refund. Please try again later.");
                }
            }
            else {
                console.warn("No paymentIntentId found, skipping refund.");
            }
        });
    }
    markBookingAsCompleted(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingIdString = typeof bookingId === 'string' ? bookingId : bookingId.toString();
                const booking = yield this.ibookingrepository.getBookingById(new mongoose_1.default.Types.ObjectId(bookingIdString));
                if (!booking) {
                    console.error(`Booking not found with ID: ${bookingIdString}`);
                    throw new Error("Booking not found");
                }
                yield this.ibookingrepository.updateBookingStatus(bookingIdString, 'completed');
            }
            catch (error) {
                console.error(`Error while completing the booking: ${error}`);
                throw new Error(`Error while completing the booking: ${error}`);
            }
        });
    }
}
exports.UserCancelBookingUseCase = UserCancelBookingUseCase;
