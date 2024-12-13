import { Router } from 'express'
export{ Router} from 'express'
import { InjectedGetAllServiceCategoryController, InjectedAdminLoginController,InjectedGetAllUserController, InjectedGetBookingsUse, InjectedBannerUse, InjectedPayoutController, InjectedDashboardController } from '../../injection/admin/AdminInjects';
import { Req, Res } from '../../Types/servertype';
import { PayoutController } from '../../../interface adapter/controllers/admin/PayoutController';
import { JwtTokenAdapter } from '../../services/JWT/Tokenservice';


const AdminRoute = Router();
const JWToken = new JwtTokenAdapter();
  
AdminRoute.post("/admin_login",JWToken.createJwtToken,InjectedAdminLoginController.AdminLoginControl.bind(InjectedAdminLoginController))
AdminRoute.get('/logout', async(req: Req, res: Res)=> {
    try {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  //user section
AdminRoute.get("/UserList",JWToken.verifyToken,InjectedGetAllUserController.GetAllUserControl.bind(InjectedGetAllUserController))
AdminRoute.post("/block/:id",JWToken.verifyToken,InjectedGetAllUserController.BlockUserControl.bind(InjectedGetAllUserController))
AdminRoute.post("/Unblock/:id",JWToken.verifyToken,InjectedGetAllUserController.UnblockUserControl.bind(InjectedGetAllUserController))

//service type section
AdminRoute.get("/ServiceList",JWToken.verifyToken,InjectedGetAllServiceCategoryController.getServiceCategories.bind(InjectedGetAllServiceCategoryController))
AdminRoute.get("/service-category/:id", JWToken.verifyToken,InjectedGetAllServiceCategoryController.getServiceCategoryById.bind(InjectedGetAllServiceCategoryController));
AdminRoute.post("/AddServiceCategory",JWToken.verifyToken,InjectedGetAllServiceCategoryController.addServiceCategory.bind(InjectedGetAllServiceCategoryController))
AdminRoute.put('/EditService-category/:id',JWToken.verifyToken,InjectedGetAllServiceCategoryController.editServiceCategory.bind(InjectedGetAllServiceCategoryController));
AdminRoute.delete('/DeleteService-category/:id',JWToken.verifyToken,InjectedGetAllServiceCategoryController.deleteServiceCategory.bind(InjectedGetAllServiceCategoryController));

//Booking section
AdminRoute.get('/bookdetails',JWToken.verifyToken,InjectedGetBookingsUse.getAllBookingDetails.bind(InjectedGetBookingsUse))

AdminRoute.get('/Bookdetails/:bookingId',JWToken.verifyToken,InjectedGetBookingsUse.getBookingById.bind(InjectedGetBookingsUse))

//dashboard section
AdminRoute.get("/get-user-count",JWToken.verifyToken,InjectedGetAllUserController.getUserCount.bind(InjectedGetAllUserController))
AdminRoute.get("/get-booking-count",JWToken.verifyToken,InjectedGetBookingsUse.getBookingCount.bind(InjectedGetBookingsUse))
AdminRoute.get("/get-totalrevenue",InjectedDashboardController.getRevenue.bind(InjectedDashboardController))
AdminRoute.get("/get-revenueOvertime",InjectedDashboardController.getRevenueOvertime.bind(InjectedDashboardController))
AdminRoute.get("/get-bookingstatus",InjectedDashboardController.getbookingStatusDistribution.bind(InjectedDashboardController))

//banner section
AdminRoute.post('/banner/addBanner',JWToken.verifyToken,InjectedBannerUse.createBanner.bind(InjectedBannerUse))
AdminRoute.get('/banner',JWToken.verifyToken,InjectedBannerUse.GetAllBanner.bind(InjectedBannerUse))
AdminRoute.get('/banner/:BannerId',JWToken.verifyToken,InjectedBannerUse.getBannerbyId.bind(InjectedBannerUse))
AdminRoute.post('/banner/updateBanner/:BannerId',JWToken.verifyToken,InjectedBannerUse.editBanner.bind(InjectedBannerUse))
AdminRoute.delete('/banner/deleteBanner/:BannerId',JWToken.verifyToken,InjectedBannerUse.deleteBanner.bind(InjectedBannerUse))

//payout section
AdminRoute.post('/initiate-payout',JWToken.verifyToken,InjectedPayoutController.initiatePayout.bind(InjectedPayoutController))
AdminRoute.get('/payouts/:status',JWToken.verifyToken,InjectedPayoutController.getPayouts.bind(InjectedPayoutController))



export default AdminRoute ;

