"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PayoutSchema = new mongoose_1.default.Schema({
    providerId: { type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'inr'
    },
    stripeTransferId: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
}, { timestamps: true });
exports.Payout = mongoose_1.default.model('Payout', PayoutSchema);
