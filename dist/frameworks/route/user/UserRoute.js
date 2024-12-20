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
const UserInjects_1 = require("../../injection/user/UserInjects");
const Tokenservice_1 = require("../../services/JWT/Tokenservice");
const router = (0, express_1.Router)();
const JWToken = new Tokenservice_1.JwtTokenAdapter();
router.post('/refresh-token', JWToken.refreshToken.bind(JWToken));
//authentication
router.post("/signup", UserInjects_1.InjectedUserRegisterController.UserRegisterControl.bind(UserInjects_1.InjectedUserRegisterController));
router.post('/verify_otp', UserInjects_1.InjectedUserVerifyOtpController.UserVerifyOtpControl.bind(UserInjects_1.InjectedUserVerifyOtpController));
router.post('/resendOtp', UserInjects_1.InjectedUserResendOtpController.resendOtp.bind(UserInjects_1.InjectedUserResendOtpController));
router.post("/login", JWToken.createJwtToken, UserInjects_1.InjectedUserLoginController.UserLoginControl.bind(UserInjects_1.InjectedUserLoginController));
router.post('/googleAuth', JWToken.createJwtToken, UserInjects_1.InjectedGoogleAuthController.GoogleoauthController.bind(UserInjects_1.InjectedGoogleAuthController));
router.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
//forget password
router.post('/forgot-password', UserInjects_1.InjectedUserForgetPassController.RequestResetPassword.bind(UserInjects_1.InjectedUserForgetPassController));
router.post('/reset-password', UserInjects_1.InjectedUserForgetPassController.resetPassword.bind(UserInjects_1.InjectedUserForgetPassController));
//EditProfile
router.get('/editProfile/:userId', UserInjects_1.InjectedEditProfileController.getUserById.bind(UserInjects_1.InjectedEditProfileController));
router.post('/editProfile/:userId', UserInjects_1.InjectedEditProfileController.editProfile.bind(UserInjects_1.InjectedEditProfileController));
//post section
router.post('/uploadpost', UserInjects_1.InjectedPostController.createService.bind(UserInjects_1.InjectedPostController));
router.get("/getallpost/:providerId", UserInjects_1.InjectedPostController.GetAllPost.bind(UserInjects_1.InjectedPostController));
router.get("/editpost/:postId", UserInjects_1.InjectedPostController.getPost.bind(UserInjects_1.InjectedPostController));
router.put('/editpost/:postId', UserInjects_1.InjectedPostController.editPost.bind(UserInjects_1.InjectedPostController));
router.delete('/deletepost/:postId', UserInjects_1.InjectedPostController.deletePost.bind(UserInjects_1.InjectedPostController));
router.get('/getallpost', UserInjects_1.InjectedPostController.getAllServices.bind(UserInjects_1.InjectedPostController));
router.get('/servicedetails/:id', UserInjects_1.InjectedPostController.getsingleService.bind((UserInjects_1.InjectedPostController)));
//booking section
router.get('/services/:serviceId/availability', UserInjects_1.InjectedPostController.getAvailability.bind(UserInjects_1.InjectedPostController));
router.post('/booknowcheckout', UserInjects_1.InjectedBookingController.createCheckoutSession.bind(UserInjects_1.InjectedBookingController));
router.get('/booking/success', UserInjects_1.InjectedBookingController.verifyPaymentAndCreateBooking.bind(UserInjects_1.InjectedBookingController));
router.post('/cancel/:bookingId', UserInjects_1.InjectedBookingController.cancelBooking.bind(UserInjects_1.InjectedBookingController));
router.post('/complete/:bookingId', UserInjects_1.InjectedBookingController.completeBooking.bind(UserInjects_1.InjectedBookingController));
router.get('/bookdetails/:userId/bookings', UserInjects_1.InjectedBookingController.getbookByUserId.bind(UserInjects_1.InjectedBookingController));
router.get('/bookdetailsbyid/:bookingId', UserInjects_1.InjectedBookingController.getBookingDetailsById.bind(UserInjects_1.InjectedBookingController));
router.get('/bookdetails/bookings/:providerId', UserInjects_1.InjectedBookingController.getProviderBookingsController.bind(UserInjects_1.InjectedBookingController));
router.get('/booking/:userId/:serviceId/status', UserInjects_1.InjectedBookingController.getBookingStatus.bind(UserInjects_1.InjectedBookingController));
//review section
router.post('/review/addReview', UserInjects_1.InjectedReviewController.createReview.bind(UserInjects_1.InjectedReviewController));
router.get('/service/:serviceId/reviews', UserInjects_1.InjectedReviewController.getReviewsByService.bind(UserInjects_1.InjectedReviewController));
//chat section
router.post('/create-conversation', UserInjects_1.InjectedChatController.createConversation.bind(UserInjects_1.InjectedChatController));
router.get('/get-user-conversations/:userId', UserInjects_1.InjectedChatController.getUserConversations.bind(UserInjects_1.InjectedChatController));
router.post('/send-message', UserInjects_1.InjectedChatController.sendMessage.bind(UserInjects_1.InjectedChatController));
router.get('/get-messages/:conversationId', UserInjects_1.InjectedChatController.getMessages.bind(UserInjects_1.InjectedChatController));
// router.get('/get-messages/:conversationId',InjectedChatController.getMessages.bind(InjectedChatController))
router.get('/home-banners', UserInjects_1.InjectedUserLoginController.getHomePageBanners.bind(UserInjects_1.InjectedUserLoginController));
exports.default = router;
