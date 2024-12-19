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
exports.Router = void 0;
const express_1 = require("express");
var express_2 = require("express");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return express_2.Router; } });
const AdminInjects_1 = require("../../injection/admin/AdminInjects");
const Tokenservice_1 = require("../../services/JWT/Tokenservice");
const AdminRoute = (0, express_1.Router)();
const JWToken = new Tokenservice_1.JwtTokenAdapter();
AdminRoute.post('/refresh-token', JWToken.refreshToken.bind(JWToken));
AdminRoute.post("/admin_login", JWToken.createJwtToken, AdminInjects_1.InjectedAdminLoginController.AdminLoginControl.bind(AdminInjects_1.InjectedAdminLoginController));
AdminRoute.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
//user section
AdminRoute.get("/UserList", JWToken.verifyToken, AdminInjects_1.InjectedGetAllUserController.GetAllUserControl.bind(AdminInjects_1.InjectedGetAllUserController));
AdminRoute.post("/block/:id", JWToken.verifyToken, AdminInjects_1.InjectedGetAllUserController.BlockUserControl.bind(AdminInjects_1.InjectedGetAllUserController));
AdminRoute.post("/Unblock/:id", JWToken.verifyToken, AdminInjects_1.InjectedGetAllUserController.UnblockUserControl.bind(AdminInjects_1.InjectedGetAllUserController));
//service type section
AdminRoute.get("/ServiceList", JWToken.verifyToken, AdminInjects_1.InjectedGetAllServiceCategoryController.getServiceCategories.bind(AdminInjects_1.InjectedGetAllServiceCategoryController));
AdminRoute.get("/service-category/:id", JWToken.verifyToken, AdminInjects_1.InjectedGetAllServiceCategoryController.getServiceCategoryById.bind(AdminInjects_1.InjectedGetAllServiceCategoryController));
AdminRoute.post("/AddServiceCategory", JWToken.verifyToken, AdminInjects_1.InjectedGetAllServiceCategoryController.addServiceCategory.bind(AdminInjects_1.InjectedGetAllServiceCategoryController));
AdminRoute.put('/EditService-category/:id', JWToken.verifyToken, AdminInjects_1.InjectedGetAllServiceCategoryController.editServiceCategory.bind(AdminInjects_1.InjectedGetAllServiceCategoryController));
AdminRoute.delete('/DeleteService-category/:id', JWToken.verifyToken, AdminInjects_1.InjectedGetAllServiceCategoryController.deleteServiceCategory.bind(AdminInjects_1.InjectedGetAllServiceCategoryController));
//Booking section
AdminRoute.get('/bookdetails', JWToken.verifyToken, AdminInjects_1.InjectedGetBookingsUse.getAllBookingDetails.bind(AdminInjects_1.InjectedGetBookingsUse));
AdminRoute.get('/Bookdetails/:bookingId', JWToken.verifyToken, AdminInjects_1.InjectedGetBookingsUse.getBookingById.bind(AdminInjects_1.InjectedGetBookingsUse));
//dashboard section
AdminRoute.get("/get-user-count", JWToken.verifyToken, AdminInjects_1.InjectedGetAllUserController.getUserCount.bind(AdminInjects_1.InjectedGetAllUserController));
AdminRoute.get("/get-booking-count", JWToken.verifyToken, AdminInjects_1.InjectedGetBookingsUse.getBookingCount.bind(AdminInjects_1.InjectedGetBookingsUse));
AdminRoute.get("/get-totalrevenue", AdminInjects_1.InjectedDashboardController.getRevenue.bind(AdminInjects_1.InjectedDashboardController));
AdminRoute.get("/get-revenueOvertime", AdminInjects_1.InjectedDashboardController.getRevenueOvertime.bind(AdminInjects_1.InjectedDashboardController));
AdminRoute.get("/get-bookingstatus", AdminInjects_1.InjectedDashboardController.getbookingStatusDistribution.bind(AdminInjects_1.InjectedDashboardController));
//banner section
AdminRoute.post('/banner/addBanner', JWToken.verifyToken, AdminInjects_1.InjectedBannerUse.createBanner.bind(AdminInjects_1.InjectedBannerUse));
AdminRoute.get('/banner', JWToken.verifyToken, AdminInjects_1.InjectedBannerUse.GetAllBanner.bind(AdminInjects_1.InjectedBannerUse));
AdminRoute.get('/banner/:BannerId', JWToken.verifyToken, AdminInjects_1.InjectedBannerUse.getBannerbyId.bind(AdminInjects_1.InjectedBannerUse));
AdminRoute.post('/banner/updateBanner/:BannerId', JWToken.verifyToken, AdminInjects_1.InjectedBannerUse.editBanner.bind(AdminInjects_1.InjectedBannerUse));
AdminRoute.delete('/banner/deleteBanner/:BannerId', JWToken.verifyToken, AdminInjects_1.InjectedBannerUse.deleteBanner.bind(AdminInjects_1.InjectedBannerUse));
//payout section
AdminRoute.post('/initiate-payout', JWToken.verifyToken, AdminInjects_1.InjectedPayoutController.initiatePayout.bind(AdminInjects_1.InjectedPayoutController));
AdminRoute.get('/payouts/:status', JWToken.verifyToken, AdminInjects_1.InjectedPayoutController.getPayouts.bind(AdminInjects_1.InjectedPayoutController));
exports.default = AdminRoute;
