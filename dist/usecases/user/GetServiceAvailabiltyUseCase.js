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
exports.GetServiceAvailabiltyUseCase = void 0;
class GetServiceAvailabiltyUseCase {
    constructor(ipostrepository, ibookrepository) {
        this.ipostrepository = ipostrepository;
        this.ibookrepository = ibookrepository;
    }
    getdates(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield this.ipostrepository.getPostById(serviceId);
                if (!service) {
                    throw new Error('Service not found');
                }
                const bookedDates = yield this.ibookrepository.getServiceDate(serviceId);
                const bookedDateStrings = bookedDates.map((booking) => booking.booking_date.toISOString());
                const availableDates = service.availability;
                return {
                    availableDates,
                    bookedDates: bookedDateStrings,
                }; // Assuming availability is an array of Date objects
            }
            catch (error) {
                throw new Error("Error occured when taking the dates");
            }
        });
    }
}
exports.GetServiceAvailabiltyUseCase = GetServiceAvailabiltyUseCase;
