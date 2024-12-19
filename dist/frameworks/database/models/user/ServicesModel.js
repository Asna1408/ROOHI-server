"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ServiceSchema = new mongoose_1.default.Schema({
    service_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    provider_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    service_type: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'ServiceCategory',
        required: true,
    },
    availability: {
        type: [Date],
        default: [],
        required: true,
    },
    images: {
        type: [String], // URL of the service image
        required: true,
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
exports.ServiceModel = mongoose_1.default.model('Service', ServiceSchema);
