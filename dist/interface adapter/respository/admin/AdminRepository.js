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
exports.AdminRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AdminModel_1 = require("../../../frameworks/database/models/admin/AdminModel");
const ServiceCategoryModel_1 = require("../../../frameworks/database/models/admin/ServiceCategoryModel");
const BookingModel_1 = __importDefault(require("../../../frameworks/database/models/user/BookingModel"));
const userModel_1 = require("../../../frameworks/database/models/user/userModel");
const BannerModel_1 = require("../../../frameworks/database/models/admin/BannerModel");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');
class AdminRepository {
    LoginAdmin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield AdminModel_1.AdminModel.findOne({ email });
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    GetAllUsers(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.UserModel.find()
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean()
                    .exec();
                console.log(users, "users");
                const total = yield userModel_1.UserModel.countDocuments();
                return [users, total];
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    BlockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    UnblockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    addServiceCategory(type_name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceCategory = new ServiceCategoryModel_1.ServiceCategoryModel({ type_name, description });
                return yield serviceCategory.save();
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    getServiceCategories(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield ServiceCategoryModel_1.ServiceCategoryModel.find()
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec();
                const total = yield ServiceCategoryModel_1.ServiceCategoryModel.countDocuments();
                return [categories, total];
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    getServiceCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ServiceCategoryModel_1.ServiceCategoryModel.findById(id);
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    editServiceCategory(id, type_name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ServiceCategoryModel_1.ServiceCategoryModel.findByIdAndUpdate(id, { type_name, description }, { new: true });
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    deleteServiceCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ServiceCategoryModel_1.ServiceCategoryModel.findByIdAndDelete(id);
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    getBookingDetails(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield BookingModel_1.default.find()
                    .populate({
                    path: 'user_id',
                    select: 'name email',
                })
                    .populate({
                    path: 'service_id',
                    select: 'service_name price',
                })
                    .skip(skip)
                    .limit(limit)
                    .lean() // Converts Mongoose documents to plain JavaScript objects
                    .exec();
                const total = yield BookingModel_1.default.countDocuments();
                return [bookings, total];
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    findBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValidObjectId = mongoose_1.default.Types.ObjectId.isValid(bookingId);
            if (!isValidObjectId) {
                throw new Error('Invalid booking ID format');
            }
            try {
                return yield BookingModel_1.default.findById(bookingId)
                    .populate({
                    path: 'user_id',
                    select: 'name email phone',
                })
                    .populate({
                    path: 'service_id',
                    select: 'service_name price',
                })
                    .exec();
            }
            catch (error) {
                console.error('Error fetching booking by ID:', error);
                throw new Error('Failed to fetch booking');
            }
        });
    }
    getUserCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.countDocuments();
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    ;
    getBookingCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BookingModel_1.default.countDocuments();
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    ;
    calculateTotalRevenue() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const revenue = yield BookingModel_1.default.aggregate([
                    // { $match: { status: 'completed' } },
                    { $group: { _id: null, total: { $sum: '$amount' } } },
                ]);
                return ((_a = revenue[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    ;
    getRevenueOverTime(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let groupByStage = {};
                let projectTimePeriod = {};
                switch (filter) {
                    case "week":
                        groupByStage = {
                            _id: { $week: "$created_at" }, // Group by week
                            totalRevenue: { $sum: "$amount" },
                        };
                        projectTimePeriod = { timePeriod: "$_id", totalRevenue: 1 };
                        break;
                    case "month":
                        groupByStage = {
                            _id: { $month: "$created_at" }, // Group by month
                            totalRevenue: { $sum: "$amount" },
                        };
                        projectTimePeriod = {
                            timePeriod: {
                                $switch: {
                                    branches: [
                                        { case: { $eq: ["$_id", 1] }, then: "Jan" },
                                        { case: { $eq: ["$_id", 2] }, then: "Feb" },
                                        { case: { $eq: ["$_id", 3] }, then: "Mar" },
                                        { case: { $eq: ["$_id", 4] }, then: "Apr" },
                                        { case: { $eq: ["$_id", 5] }, then: "May" },
                                        { case: { $eq: ["$_id", 6] }, then: "Jun" },
                                        { case: { $eq: ["$_id", 7] }, then: "Jul" },
                                        { case: { $eq: ["$_id", 8] }, then: "Aug" },
                                        { case: { $eq: ["$_id", 9] }, then: "Sep" },
                                        { case: { $eq: ["$_id", 10] }, then: "Oct" },
                                        { case: { $eq: ["$_id", 11] }, then: "Nov" },
                                        { case: { $eq: ["$_id", 12] }, then: "Dec" },
                                    ],
                                    default: "Unknown",
                                },
                            },
                            totalRevenue: 1,
                        };
                        break;
                    case "year":
                        groupByStage = {
                            _id: { $year: "$created_at" }, // Group by year
                            totalRevenue: { $sum: "$amount" },
                        };
                        projectTimePeriod = { timePeriod: "$_id", totalRevenue: 1 };
                        break;
                    default:
                        throw new Error("Invalid filter type. Use 'week', 'month', or 'year'.");
                }
                return yield BookingModel_1.default.aggregate([
                    { $match: { created_at: { $ne: null } } }, // Ensure created_at exists
                    { $group: groupByStage },
                    { $project: projectTimePeriod },
                    { $sort: { "_id": 1 } }, // Sort by time period
                ]);
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    getBookingStatusDistribution() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BookingModel_1.default.aggregate([
                    { $group: { _id: '$status', count: { $sum: 1 } } },
                ]);
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    ;
    createBanner(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BannerModel_1.BannerModel.create(data);
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    getBanners(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield BannerModel_1.BannerModel.find()
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec();
                const total = yield BannerModel_1.BannerModel.countDocuments();
                return [banners, total];
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    getBannerById(BannerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BannerModel_1.BannerModel.findById(BannerId);
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    updateBanner(BannerId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BannerModel_1.BannerModel.findByIdAndUpdate(BannerId, data, { new: true });
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
    deleteBanner(BannerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BannerModel_1.BannerModel.findByIdAndDelete(BannerId);
            }
            catch (error) {
                throw new Error("Error occured Admin Login");
            }
        });
    }
}
exports.AdminRepository = AdminRepository;
