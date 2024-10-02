import { Router } from 'express'
export{ Router} from 'express'
import { InjectedGoogleAuthController, InjectedUserForgetPassController, InjectedUserLoginController, InjectedUserRegisterController, InjectedUserResendOtpController, InjectedUserVerifyOtpController } from '../../injection/user/UserInjects';
import { JwtTokenAdapter } from '../../services/JWT/Tokenservice';
import { Req, Res } from '../../Types/servertype';

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

export default router ;  
