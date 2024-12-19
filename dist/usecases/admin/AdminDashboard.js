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
exports.AdminDashboardUsecase = void 0;
class AdminDashboardUsecase {
    constructor(iadminrepository) {
        this.iadminrepository = iadminrepository;
    }
    totalRevenue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.iadminrepository.calculateTotalRevenue();
            }
            catch (error) {
                throw new Error("Error occcured Total Revenue");
            }
        });
    }
    ;
    revenueOverTime(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.iadminrepository.getRevenueOverTime(filter);
            }
            catch (error) {
                throw new Error("Error occcured fetching revenue");
            }
        });
    }
    ;
    bookingStatusDistribution() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.iadminrepository.getBookingStatusDistribution();
            }
            catch (error) {
                throw new Error("Error occcured booking status in dashboard");
            }
        });
    }
    ;
}
exports.AdminDashboardUsecase = AdminDashboardUsecase;
