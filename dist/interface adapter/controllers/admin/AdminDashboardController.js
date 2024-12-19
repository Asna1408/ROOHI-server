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
exports.AdminDashboardController = void 0;
class AdminDashboardController {
    constructor(iadminDashboard) {
        this.iadminDashboard = iadminDashboard;
    }
    getRevenue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const metrics = yield this.iadminDashboard.totalRevenue();
                res.json(metrics);
            }
            catch (err) {
                res.status(500).json({ error: 'Server Error' });
            }
        });
    }
    ;
    getRevenueOvertime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = typeof req.query.filter === "string" ? req.query.filter : "month"; // Ensure filter is a string
            try {
                const metrics = yield this.iadminDashboard.revenueOverTime(filter);
                res.json(metrics);
            }
            catch (err) {
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    getbookingStatusDistribution(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const metrics = yield this.iadminDashboard.bookingStatusDistribution();
                res.json(metrics);
            }
            catch (err) {
                res.status(500).json({ error: 'Server Error' });
            }
        });
    }
    ;
}
exports.AdminDashboardController = AdminDashboardController;
