import { NextFunction, Router } from 'express'
export{ Router} from 'express'
import { InjectedPostController, InjectedGoogleAuthController, InjectedUserForgetPassController, InjectedUserLoginController, InjectedUserRegisterController, InjectedUserResendOtpController, InjectedUserVerifyOtpController, InjectedBookingController } from '../../injection/user/UserInjects';
import { JwtTokenAdapter } from '../../services/JWT/Tokenservice';
import { Req, Res } from '../../Types/servertype';
import { ServiceModel } from '../../database/models/user/ServicesModel';
import { ServiceCategoryModel } from '../../database/models/admin/ServiceCategoryModel';
import { UserPostController } from '../../../interface adapter/controllers/user/UserPostController';
import { UserModel } from '../../database/models/user/userModel';
import mongoose from 'mongoose';

const router = Router();
const JWToken = new JwtTokenAdapter();



router.post("/signup",InjectedUserRegisterController.UserRegisterControl.bind(InjectedUserRegisterController))
router.post('/verify_otp', InjectedUserVerifyOtpController.UserVerifyOtpControl.bind(InjectedUserVerifyOtpController));
router.post("/login",JWToken.createJwtToken, InjectedUserLoginController.UserLoginControl.bind(InjectedUserLoginController));
router.post('/googleAuth',JWToken.createJwtToken,InjectedGoogleAuthController.GoogleoauthController.bind(InjectedGoogleAuthController))
router.get('/logout', async(req: Req, res: Res)=> {
    try {
      res.clearCookie("access_token");
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  router.post('/resendOtp',InjectedUserResendOtpController.resendOtp.bind(InjectedUserResendOtpController))

router.post('/forgot-password',InjectedUserForgetPassController.RequestResetPassword.bind(InjectedUserForgetPassController))
router.post('/reset-password',InjectedUserForgetPassController.resetPassword.bind(InjectedUserForgetPassController))
router.post('/uploadpost',InjectedPostController.createService.bind(InjectedPostController))
router.get("/getallpost/:providerId",InjectedPostController.GetAllPost.bind(InjectedPostController))
router.get("/editpost/:postId",InjectedPostController.getPost.bind(InjectedPostController))
router.put('/editpost/:postId', InjectedPostController.editPost.bind(InjectedPostController));
router.delete('/deletepost/:postId', InjectedPostController.deletePost.bind(InjectedPostController));
router.get('/getallpost',InjectedPostController.getAllServices.bind(InjectedPostController))
router.get('/servicedetails/:id',InjectedPostController.getsingleService.bind((InjectedPostController)))
router.post('/booknowcheckout',InjectedBookingController.createCheckoutSession.bind(InjectedBookingController))

router.get('/services/:serviceId/availability',InjectedPostController.getAvailability.bind(InjectedPostController))


export default router ;  
