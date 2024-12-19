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
exports.ReviewRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewModel_1 = __importDefault(require("../../../frameworks/database/models/user/ReviewModel"));
class ReviewRepository {
    createReview(userId, serviceId, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.isValidObjectId(userId) || !mongoose_1.default.isValidObjectId(serviceId)) {
                    throw new Error("Invalid userId or serviceId provided");
                }
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const serviceObjectId = new mongoose_1.default.Types.ObjectId(serviceId);
                const newReview = new ReviewModel_1.default({
                    user_id: userObjectId,
                    service_id: serviceObjectId,
                    rating,
                    review
                });
                yield newReview.save();
                return newReview;
            }
            catch (error) {
                console.error("Error while adding review:", error);
                throw new Error("Failed to add review");
            }
        });
    }
    getReviewsByService(service_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return ReviewModel_1.default.find({ service_id }).populate('user_id', 'name').exec();
            }
            catch (error) {
                throw new Error("error occured when finding the review by service");
            }
        });
    }
}
exports.ReviewRepository = ReviewRepository;
