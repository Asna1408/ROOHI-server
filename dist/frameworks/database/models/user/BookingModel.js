"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    service_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: 'Service',
    },
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    provider_id: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
    },
    booking_date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: false,
    },
    sessionId: {
        type: String,
        required: false,
    },
    paymentIntentId: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'canceled', 'completed'],
        default: 'pending',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});
// Middleware to update the updated_at field
BookingSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
// Create the Booking model
const BookingModel = mongoose_1.default.model('Booking', BookingSchema);
exports.default = BookingModel;
