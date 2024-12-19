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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const mongoose_1 = require("mongoose");
class ReviewController {
    constructor(icreateReviewUsecaseinterface, igetreviewByusecaseinterface) {
        this.icreateReviewUsecaseinterface = icreateReviewUsecaseinterface;
        this.igetreviewByusecaseinterface = igetreviewByusecaseinterface;
    }
    createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { service_id, rating, review } = req.body;
            const userId = req.body.user_id;
            try {
                if (!userId) {
                    return res.status(400).json({ error: "User ID is required" });
                }
                const newReview = yield this.icreateReviewUsecaseinterface.createReview(userId, service_id, rating, review);
                return res.status(201).json(newReview);
            }
            catch (error) {
                return res.status(500).json({ error: 'Failed to create review' });
            }
        });
    }
    getReviewsByService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceId } = req.params;
                const reviews = yield this.igetreviewByusecaseinterface.getReviewsByService(new mongoose_1.Types.ObjectId(serviceId));
                res.status(200).json(reviews);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching reviews', error });
            }
        });
    }
}
exports.ReviewController = ReviewController;
