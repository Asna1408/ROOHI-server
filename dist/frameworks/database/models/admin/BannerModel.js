"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BannerSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    images: {
        type: [String],
        required: true
    },
    isActive: {
        type: Boolean,
    },
}, {
    timestamps: true,
});
exports.BannerModel = mongoose_1.default.model("Banner", BannerSchema);
