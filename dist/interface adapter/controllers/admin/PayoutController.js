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
exports.PayoutController = void 0;
class PayoutController {
    constructor(payoutUseCase) {
        this.payoutUseCase = payoutUseCase;
    }
    initiatePayout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { providerId, stripeAccountId, amount, currency } = req.body;
            try {
                const transfer = yield this.payoutUseCase.processPayout(providerId, stripeAccountId, amount, currency);
                res.status(200).json({ message: "Payout processed successfully", transfer });
            }
            catch (error) {
                res.status(500).json({ message: "Failed to process payout", error: error.message });
            }
        });
    }
    getPayouts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = req.params;
            try {
                const payouts = yield this.payoutUseCase.getPayoutsByStatus(status);
                res.status(200).json(payouts);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to fetch payouts", error: error.message });
            }
        });
    }
}
exports.PayoutController = PayoutController;
