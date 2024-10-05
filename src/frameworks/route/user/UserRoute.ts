import { Router } from 'express'
export{ Router} from 'express'
import { InjectedAddPostController, InjectedGoogleAuthController, InjectedUserForgetPassController, InjectedUserLoginController, InjectedUserRegisterController, InjectedUserResendOtpController, InjectedUserVerifyOtpController } from '../../injection/user/UserInjects';
import { JwtTokenAdapter } from '../../services/JWT/Tokenservice';
import { Req, Res } from '../../Types/servertype';
import { ServiceModel } from '../../database/models/user/ServicesModel';
import { ServiceCategoryModel } from '../../database/models/admin/ServiceCategoryModel';
import { UserPostController } from '../../../interface adapter/controllers/user/UserPostController';

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

router.post('/addpost', async (req: Req, res: Res) => {
  try {
    // Extract data from request body
    const { service_name, description, price, provider_id, service_type, availability } = req.body;

    // Check if service type exists in ServiceCategory collection
    const serviceCategory = await ServiceCategoryModel.findById(service_type);
    if (!serviceCategory) {
      return res.status(400).json({ message: 'Invalid service type selected' });
    }

    // Handle file upload to S3
    // if (!req.file) {
    //   return res.status(400).json({ message: 'Service image is required' });
    // }

    // const file = req.file; // Assuming you're using middleware like multer or another solution to process file uploads
    // const imageUrl = await uploadToS3(file);

    // Create a new service (post)
    const newService = new ServiceModel({
      service_name,
      description,
      price,
      provider_id,
      service_type,
      availability: availability.map((date: string) => new Date(date)), // Convert date strings to Date objects
    //   image: imageUrl.Location,
    });

    // Save the service to the database
    await newService.save();

    return res.status(201).json({ message: 'Service created successfully', service: newService });
  } catch (error) {
    console.error('Error adding service:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/uploadpost',InjectedAddPostController.createService.bind(InjectedAddPostController))




export default router ;  
