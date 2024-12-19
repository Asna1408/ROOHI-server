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
exports.PayoutUseCase = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');
class PayoutUseCase {
    constructor(payoutRepository) {
        this.payoutRepository = payoutRepository;
    }
    processPayout(providerId, stripeAccountId, amount, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create a payout record without the stripeTransferId initially
            const payoutRecord = yield this.payoutRepository.createPayoutRecord({
                providerId,
                amount,
                currency,
                status: "pending",
            });
            try {
                // Process the transfer via Stripe
                // Retrieve account information
                const account = yield stripe.accounts.retrieve(stripeAccountId);
                // Check if capabilities exist and if 'transfers' capability is enabled
                // if (account.capabilities?.transfers !== 'active') {
                //   throw new Error("The connected account is not capable of receiving transfers.");
                // }
                // Proceed with the transfer
                const transfer = yield stripe.transfers.create({
                    amount: Math.round(amount * 100), // Convert to cents
                    currency,
                    destination: stripeAccountId,
                });
                // Update the payout record with the transfer details
                yield this.payoutRepository.updatePayoutStatus(payoutRecord._id, "completed", transfer.id);
                return transfer;
            }
            catch (error) {
                // If the transfer fails, update the record to "failed"
                yield this.payoutRepository.updatePayoutStatus(payoutRecord._id, "failed", null);
                throw error;
            }
        });
    }
    getPayoutsByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.payoutRepository.getPayoutsByStatus(status);
            }
            catch (error) {
                throw new Error("error on fetching payout status");
            }
        });
    }
}
exports.PayoutUseCase = PayoutUseCase;
