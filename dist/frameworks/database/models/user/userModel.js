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
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    otp: {
        type: String
    },
    password: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    stripeAccountId: {
        type: String,
        default: null // to store connected Stripe account ID for providers
    },
}, { timestamps: true });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // Check if the password is modified
        if (!user.isModified('password')) {
            return next();
        }
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            // Ensure password is a string and hash it
            if (user.password) {
                user.password = yield bcrypt_1.default.hash(user.password, salt);
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
