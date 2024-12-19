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
exports.UserCreateBookingUseCase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ServicesModel_1 = require("../../frameworks/database/models/user/ServicesModel");
const stripe_1 = __importDefault(require("stripe"));
const userModel_1 = require("../../frameworks/database/models/user/userModel");
const stripe = new stripe_1.default('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');
class UserCreateBookingUseCase {
    constructor(ibookingrepository) {
        this.ibookingrepository = ibookingrepository;
    }
    createConnectedAccount(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a new connected account on Stripe
                const account = yield stripe.accounts.create({
                    type: "express", // "express" is commonly used for managed connected accounts
                    email: email,
                    capabilities: {
                        card_payments: { requested: true },
                        transfers: { requested: true },
                    },
                });
                return account.id;
            }
            catch (error) {
                console.error("Error creating Stripe connected account:", error);
                throw new Error("Failed to create connected account.");
            }
        });
    }
    CreateBook(serviceId, userId, selectedDate, paymentStatus, sessionId, paymentIntentId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceObjectId = typeof serviceId === 'string' ? new mongoose_1.default.Types.ObjectId(serviceId) : serviceId;
                const service = yield ServicesModel_1.ServiceModel.findById(serviceObjectId).exec();
                if (!service) {
                    throw new Error("Service not found");
                }
                const isDateAvailable = service.availability.some((availableDate) => {
                    const availableDateObj = availableDate instanceof Date ? availableDate : new Date(availableDate);
                    return availableDateObj.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
                });
                if (!isDateAvailable) {
                    throw new Error("Selected date is not available for booking");
                }
                const updateResult = yield ServicesModel_1.ServiceModel.updateOne({ _id: serviceObjectId }, { $pull: { availability: selectedDate } });
                if (updateResult.modifiedCount === 0) {
                    throw new Error("Failed to update service availability");
                }
                const provider = yield userModel_1.UserModel.findById(service.provider_id);
                if (!provider) {
                    throw new Error("Provider not found");
                }
                if (!provider.stripeAccountId) {
                    // Create a connected account for the provider on their first booking
                    const stripeAccountId = yield this.createConnectedAccount(provider.email);
                    // Update provider with their new Stripe account ID
                    provider.stripeAccountId = stripeAccountId;
                    yield provider.save();
                }
                const bookingData = {
                    service_id: serviceObjectId,
                    user_id: userId,
                    provider_id: provider._id,
                    booking_date: selectedDate,
                    amount,
                    sessionId,
                    paymentIntentId,
                    status: "confirmed",
                    created_at: new Date(),
                    updated_at: new Date(),
                };
                return yield this.ibookingrepository.createBooking(bookingData);
            }
            catch (error) {
                console.error("Error creating booking:", error);
                throw new Error(`Booking creation failed: ${error}`);
            }
        });
    }
}
exports.UserCreateBookingUseCase = UserCreateBookingUseCase;
