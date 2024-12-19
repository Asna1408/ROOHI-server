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
exports.AdminAllBookingController = void 0;
class AdminAllBookingController {
    constructor(iadminbookinddetailUsecase, igetadminbookingbyidusecaseInterface, igetbookingcountusecase) {
        this.iadminbookinddetailUsecase = iadminbookinddetailUsecase;
        this.igetadminbookingbyidusecaseInterface = igetadminbookingbyidusecaseInterface;
        this.igetbookingcountusecase = igetbookingcountusecase;
    }
    getAllBookingDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const bookings = yield this.iadminbookinddetailUsecase.getAllBookingDetails(page, limit);
                res.status(200).json(bookings);
            }
            catch (error) {
                console.error('Error fetching booking details:', error);
                res.status(500).json({ message: 'Failed to fetch booking details' });
            }
        });
    }
    getBookingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bookingId } = req.params;
            try {
                const booking = yield this.igetadminbookingbyidusecaseInterface.GetBookingById(bookingId);
                res.status(200).json(booking);
            }
            catch (error) {
                console.error('Error fetching booking by ID:', error);
                res.status(500).json({ message: 'Failed to fetch booking details' });
            }
        });
    }
    getBookingCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.igetbookingcountusecase.getBookingCount();
                res.status(200).json({ count });
            }
            catch (error) {
                console.error("Error fetching booking count:", error);
                res.status(500).json({ message: 'Error fetching booking count' });
            }
        });
    }
    ;
}
exports.AdminAllBookingController = AdminAllBookingController;
