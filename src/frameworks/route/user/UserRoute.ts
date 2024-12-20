import { NextFunction, Router } from 'express'
export{ Router} from 'express'
import { InjectedPostController, InjectedGoogleAuthController, InjectedUserForgetPassController, InjectedUserLoginController, InjectedUserRegisterController, InjectedUserResendOtpController, InjectedUserVerifyOtpController, InjectedBookingController, InjectedReviewController, InjectedChatController, InjectedEditProfileController } from '../../injection/user/UserInjects';
import { JwtTokenAdapter } from '../../services/JWT/Tokenservice';
import { Req, Res } from '../../Types/servertype';
import { ServiceModel } from '../../database/models/user/ServicesModel';
import { ServiceCategoryModel } from '../../database/models/admin/ServiceCategoryModel';
import { UserPostController } from '../../../interface adapter/controllers/user/UserPostController';
import { UserModel } from '../../database/models/user/userModel';
import mongoose from 'mongoose';
import MessageModel from '../../database/models/user/MessageModel';
import ConversationModel from '../../database/models/user/ConversationModel';

const router = Router();
const JWToken = new JwtTokenAdapter();

router.post('/refresh-token', JWToken.refreshToken.bind(JWToken));

//authentication
router.post("/signup",InjectedUserRegisterController.UserRegisterControl.bind(InjectedUserRegisterController))
router.post('/verify_otp', InjectedUserVerifyOtpController.UserVerifyOtpControl.bind(InjectedUserVerifyOtpController));
router.post('/resendOtp',InjectedUserResendOtpController.resendOtp.bind(InjectedUserResendOtpController))
router.post("/login",JWToken.createJwtToken, InjectedUserLoginController.UserLoginControl.bind(InjectedUserLoginController));
router.post('/googleAuth',JWToken.createJwtToken,InjectedGoogleAuthController.GoogleoauthController.bind(InjectedGoogleAuthController))
router.get('/logout', async(req: Req, res: Res)=> {
    try {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })


//forget password
router.post('/forgot-password',InjectedUserForgetPassController.RequestResetPassword.bind(InjectedUserForgetPassController))
router.post('/reset-password',InjectedUserForgetPassController.resetPassword.bind(InjectedUserForgetPassController))


//EditProfile
router.get('/editProfile/:userId',InjectedEditProfileController.getUserById.bind(InjectedEditProfileController))
router.post('/editProfile/:userId',InjectedEditProfileController.editProfile.bind(InjectedEditProfileController))


//post section
router.post('/uploadpost',InjectedPostController.createService.bind(InjectedPostController))
router.get("/getallpost/:providerId",InjectedPostController.GetAllPost.bind(InjectedPostController))
router.get("/editpost/:postId",InjectedPostController.getPost.bind(InjectedPostController))
router.put('/editpost/:postId', InjectedPostController.editPost.bind(InjectedPostController));
router.delete('/deletepost/:postId', InjectedPostController.deletePost.bind(InjectedPostController));
router.get('/getallpost',InjectedPostController.getAllServices.bind(InjectedPostController));
router.get('/servicedetails/:id',InjectedPostController.getsingleService.bind((InjectedPostController)));


//booking section
router.get('/services/:serviceId/availability',InjectedPostController.getAvailability.bind(InjectedPostController));
router.post('/booknowcheckout',InjectedBookingController.createCheckoutSession.bind(InjectedBookingController));
router.get('/booking/success',InjectedBookingController. verifyPaymentAndCreateBooking.bind(InjectedBookingController));
router.post('/cancel/:bookingId',InjectedBookingController.cancelBooking.bind(InjectedBookingController));
router.post('/complete/:bookingId',InjectedBookingController.completeBooking.bind(InjectedBookingController))
router.get('/bookdetails/:userId/bookings',InjectedBookingController.getbookByUserId.bind(InjectedBookingController));
router.get('/bookdetailsbyid/:bookingId',InjectedBookingController.getBookingDetailsById.bind(InjectedBookingController));
router.get('/bookdetails/bookings/:providerId',InjectedBookingController.getProviderBookingsController.bind(InjectedBookingController))
router.get('/booking/:userId/:serviceId/status',InjectedBookingController.getBookingStatus.bind(InjectedBookingController))


//review section
router.post('/review/addReview' ,InjectedReviewController.createReview.bind(InjectedReviewController));
router.get('/service/:serviceId/reviews',InjectedReviewController.getReviewsByService.bind(InjectedReviewController));


//chat section
router.post('/create-conversation',InjectedChatController.createConversation.bind(InjectedChatController))
router.get('/get-user-conversations/:userId',InjectedChatController.getUserConversations.bind(InjectedChatController))
router.post('/send-message',InjectedChatController.sendMessage.bind(InjectedChatController))
router.get('/get-messages/:conversationId',InjectedChatController.getMessages.bind(InjectedChatController))
// router.get('/get-messages/:conversationId',InjectedChatController.getMessages.bind(InjectedChatController))


router.get('/home-banners', InjectedUserLoginController.getHomePageBanners.bind(InjectedUserLoginController));






export default router ;  
