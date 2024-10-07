import { NextFunction, Router } from 'express'
export{ Router} from 'express'
import { InjectedAddPostController, InjectedGoogleAuthController, InjectedUserForgetPassController, InjectedUserLoginController, InjectedUserRegisterController, InjectedUserResendOtpController, InjectedUserVerifyOtpController } from '../../injection/user/UserInjects';
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
router.post('/uploadpost',InjectedAddPostController.createService.bind(InjectedAddPostController))
router.get("/getallpost/:providerId",InjectedAddPostController.GetAllPost.bind(InjectedAddPostController))
router.get("/editpost/:postId",InjectedAddPostController.getPost.bind(InjectedAddPostController))
router.put('/editpost/:postId', InjectedAddPostController.editPost.bind(InjectedAddPostController));
router.delete('/deletepost/:postId', InjectedAddPostController.deletePost.bind(InjectedAddPostController));


export default router ;  
