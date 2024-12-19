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
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const mongoUri = "mongodb+srv://asnatm01:asna123@cluster0.qe52r.mongodb.net/roohi";
        const mongoUri = process.env.MONGO_URL;
        if (mongoUri) {
            yield mongoose_1.default.connect(mongoUri);
            console.log("mongoDb connected");
        }
        else {
            console.log("No uri available");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.connectDb = connectDb;
