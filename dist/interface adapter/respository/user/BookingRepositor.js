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
exports.BookingRepository = void 0;
const BookingModel_1 = __importDefault(require("../../../frameworks/database/models/user/BookingModel"));
class BookingRepository {
    createBooking(BookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BookingModel_1.default.create(BookingData);
            }
            catch (error) {
                throw new Error("Error on creating Booking");
            }
        });
    }
    getServiceDate(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BookingModel_1.default.find({ service_id: serviceId }).select('booking_date -_id').exec();
            }
            catch (error) {
                throw new Error("Error on getting services date");
            }
        });
    }
    getBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield BookingModel_1.default.findById(bookingId).lean().exec();
                if (!booking)
                    return null;
                return booking;
            }
            catch (error) {
                throw new Error(`Unable to fetch booking with ID: ${bookingId}. Error: ${error}`);
            }
        });
    }
    getBookingdetailsById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BookingModel_1.default.findById(bookingId).populate('service_id').populate('user_id', 'name email phone');
            }
            catch (error) {
                throw new Error(`Unable to fetch booking details with ID: ${bookingId}. Error: ${error}`);
            }
        });
    }
    updateBookingStatus(bookingId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BookingModel_1.default.findByIdAndUpdate(bookingId, { status }).exec();
            }
            catch (error) {
                throw new Error("Error on updating the booking status");
            }
        });
    }
    findBookingsByUserId(userId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield BookingModel_1.default.find({ user_id: userId })
                    .populate('service_id', 'service_name')
                    .sort({ booking_date: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec();
                const total = yield BookingModel_1.default.countDocuments({ user_id: userId });
                return { bookings, total };
            }
            catch (error) {
                throw new Error("Error due to fetch the booking Data by userId");
            }
        });
    }
    getBookingsByProviderId(providerId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield BookingModel_1.default.find({ provider_id: providerId })
                    .populate('user_id', 'name email')
                    .populate('service_id', 'service_name price')
                    .sort({ booking_date: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec();
                const total = yield BookingModel_1.default.countDocuments({ provider_id: providerId });
                return { bookings, total };
            }
            catch (error) {
                throw new Error("Error occured on fetching booking by provider id");
            }
        });
    }
    //for review and rating
    getBookingByUserAndService(userId, serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BookingModel_1.default.findOne({ user_id: userId, service_id: serviceId }).select('status').exec();
            }
            catch (error) {
                throw new Error("Error on fetching the booking by user and service for review");
            }
        });
    }
}
exports.BookingRepository = BookingRepository;
