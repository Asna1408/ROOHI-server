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
exports.PayoutRepository = void 0;
const PayoutModel_1 = require("../../../frameworks/database/models/admin/PayoutModel");
class PayoutRepository {
    createPayoutRecord(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PayoutModel_1.Payout.create(data);
            }
            catch (error) {
                throw new Error("Error occured creating Payout" + error);
            }
        });
    }
    updatePayoutStatus(payoutId, status, transferId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PayoutModel_1.Payout.findByIdAndUpdate(payoutId, { status, stripeTransferId: transferId }, { new: true });
            }
            catch (error) {
                throw new Error("Error occured updating Payoutstatus" + error);
            }
        });
    }
    getPayoutsByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PayoutModel_1.Payout.find({ status });
            }
            catch (error) {
                throw new Error("Error occured fetching Payoutstatus" + error);
            }
        });
    }
}
exports.PayoutRepository = PayoutRepository;
