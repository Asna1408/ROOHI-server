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
exports.BookingController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');
class BookingController {
    constructor(icreatebookingUsecaseinterface, icancelBookingUsecaseInterface, igetBookingUsecaseInterface, igetbookingbyproviderIdUsecaseInterface, igetbookDetailsbyIdusecaseInterface, ifetchReviewdateUsecaseinterface) {
        this.icreatebookingUsecaseinterface = icreatebookingUsecaseinterface;
        this.icancelBookingUsecaseInterface = icancelBookingUsecaseInterface;
        this.igetBookingUsecaseInterface = igetBookingUsecaseInterface;
        this.igetbookingbyproviderIdUsecaseInterface = igetbookingbyproviderIdUsecaseInterface;
        this.igetbookDetailsbyIdusecaseInterface = igetbookDetailsbyIdusecaseInterface;
        this.ifetchReviewdateUsecaseinterface = ifetchReviewdateUsecaseinterface;
    }
    // Controller to create a checkout session
    // async createCheckoutSession(req: Req, res: Res) {
    //     const { serviceId, userId, selectedDate, amount, currency } = req.body;
    //     try {
    //         const session = await stripe.checkout.sessions.create({
    //             payment_method_types: ['card'], 
    //             line_items: [
    //                 {
    //                     price_data: {
    //                         currency: currency,
    //                         product_data: {
    //                             name: `Booking for service ID: ${serviceId}`, 
    //                         },
    //                         unit_amount: amount, // Amount in cents
    //                     },
    //                     quantity: 1,
    //                 },
    //             ],
    //             mode: 'payment',
    //             success_url: `${req.headers.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`, // Redirect after payment success
    //             cancel_url: `${req.headers.origin}/booking/cancel`, 
    //         });
    //         const booking = await this.icreatebookingUsecaseinterface.CreateBook(
    //             serviceId,
    //             userId,
    //             new Date(selectedDate), 
    //             'pending', 
    //             session.id 
    //         );
    //         res.status(201).json({ success: true, sessionId: session.id });
    //     } catch (error) {
    //         const err = error as Error; 
    //         console.error('Payment error:', err.message); 
    //         res.status(500).json({ error: err.message });
    //     }
    // }
    createCheckoutSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serviceId, userId, selectedDate, amount, currency } = req.body;
            try {
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: currency,
                                product_data: {
                                    name: `Booking for service ID: ${serviceId}`,
                                },
                                unit_amount: amount, // Amount in cents
                            },
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    success_url: `${req.headers.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}&service_id=${serviceId}&user_id=${userId}&selected_date=${selectedDate}`, // Redirect after payment success
                    cancel_url: `${req.headers.origin}/booking/cancel`,
                });
                res.status(201).json({ success: true, sessionId: session.id });
            }
            catch (error) {
                const err = error;
                console.error('Payment error:', err.message);
                res.status(500).json({ error: err.message });
            }
        });
    }
    verifyPaymentAndCreateBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionId = req.query.session_id;
            const serviceId = req.query.service_id;
            const userId = req.query.user_id;
            const selectedDate = req.query.selected_date;
            if (!sessionId || !serviceId || !userId || !selectedDate) {
                console.error("Session ID or parameters are missing");
                return res.status(400).json({ error: "Session ID and parameters are required" });
            }
            try {
                // Retrieve the session from Stripe
                const session = yield stripe.checkout.sessions.retrieve(sessionId);
                // Ensure the session is paid and has a payment intent ID
                if (session.payment_status === "paid" && session.payment_intent) {
                    const amount = session.amount_total ? session.amount_total / 100 : 0; // Amount in currency units
                    const booking = yield this.icreatebookingUsecaseinterface.CreateBook(new mongoose_1.default.Types.ObjectId(serviceId), new mongoose_1.default.Types.ObjectId(userId), new Date(selectedDate), "confirmed", sessionId, session.payment_intent.toString(), amount);
                    res.status(201).json({ success: true, booking });
                }
                else {
                    throw new Error("Payment was not successful");
                }
            }
            catch (error) {
                console.error("Verification error:", error);
                res.status(500).json({ error: "Verification failed" });
            }
        });
    }
    cancelBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bookingId } = req.params;
            try {
                const bookingObjectId = new mongoose_1.default.Types.ObjectId(bookingId);
                yield this.icancelBookingUsecaseInterface.cancelBooking(bookingObjectId);
                res.status(200).json({ success: true, message: "Booking cancelled and refund processed." });
            }
            catch (error) {
                const err = error;
                console.error('Cancellation error:', err.message);
                res.status(500).json({ error: err.message });
            }
        });
    }
    completeBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bookingId } = req.params;
            try {
                const bookingObjectId = new mongoose_1.default.Types.ObjectId(bookingId);
                yield this.icancelBookingUsecaseInterface.markBookingAsCompleted(bookingObjectId);
                res.status(200).json({
                    message: 'Booking has been successfully marked as completed',
                });
            }
            catch (error) {
                console.error('Error completing booking:', error);
                res.status(500).json({
                    message: 'Error completing booking',
                    error: error
                });
            }
        });
    }
    getbookByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            const skip = (page - 1) * limit;
            try {
                if (!userId) {
                    return res.status(400).json({ error: "User ID is required" });
                }
                const isValidObjectId = mongoose_1.default.Types.ObjectId.isValid(userId);
                if (!isValidObjectId) {
                    return res.status(400).json({ error: "Invalid User ID format" });
                }
                const { bookings, total } = yield this.igetBookingUsecaseInterface.getbookByUserId(userId, skip, limit);
                if (!bookings || bookings.length === 0) {
                    return res.status(404).json({ message: "No bookings found for this user" });
                }
                return res.status(200).json({
                    bookings,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                });
            }
            catch (error) {
                console.error("Error fetching bookings:", error);
                return res.status(500).json({ error: "Failed to fetch booking details", details: error });
            }
        });
    }
    getBookingDetailsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.params.bookingId;
                const booking = yield this.igetbookDetailsbyIdusecaseInterface.getbookingdetailsById(bookingId);
                res.status(200).json(booking);
            }
            catch (error) {
                res.status(500).json({ error: `booking failed ${error}` });
            }
        });
    }
    getProviderBookingsController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { providerId } = req.params;
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            const skip = (page - 1) * limit;
            try {
                if (!providerId) {
                    return res.status(400).json({ error: "Provider ID is required" });
                }
                const isValidObjectId = mongoose_1.default.Types.ObjectId.isValid(providerId);
                if (!isValidObjectId) {
                    return res.status(400).json({ error: "Invalid Provider ID format" });
                }
                const { bookings, total } = yield this.igetbookingbyproviderIdUsecaseInterface.getProviderBookings(providerId, skip, limit);
                return res.status(200).json({
                    bookings,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
    getBookingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, serviceId } = req.params;
            try {
                const bookingStatus = yield this.ifetchReviewdateUsecaseinterface.FetchBookingStatus(userId, serviceId);
                res.status(200).json({ bookingStatus });
            }
            catch (error) {
                res.status(404).json({ message: error });
            }
        });
    }
}
exports.BookingController = BookingController;
