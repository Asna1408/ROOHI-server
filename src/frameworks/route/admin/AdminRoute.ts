import { Router } from 'express'
export{ Router} from 'express'
import { InjectedGetAllServiceCategoryController, InjectedAdminLoginController,InjectedGetAllUserController, InjectedGetBookingsUse, InjectedBannerUse, InjectedPayoutController, InjectedDashboardController } from '../../injection/admin/AdminInjects';
import { Req, Res } from '../../Types/servertype';
import { PayoutController } from '../../../interface adapter/controllers/admin/PayoutController';
import { JwtTokenAdapter } from '../../services/JWT/Tokenservice';


const AdminRoute = Router();
const JWToken = new JwtTokenAdapter();
AdminRoute.post('/refresh-token', JWToken.refreshToken.bind(JWToken));

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
AdminRoute.get("/UserList",InjectedGetAllUserController.GetAllUserControl.bind(InjectedGetAllUserController))
AdminRoute.post("/block/:id",InjectedGetAllUserController.BlockUserControl.bind(InjectedGetAllUserController))
AdminRoute.post("/Unblock/:id",InjectedGetAllUserController.UnblockUserControl.bind(InjectedGetAllUserController))

//service type section
AdminRoute.get("/ServiceList",InjectedGetAllServiceCategoryController.getServiceCategories.bind(InjectedGetAllServiceCategoryController))
AdminRoute.get("/service-category/:id",InjectedGetAllServiceCategoryController.getServiceCategoryById.bind(InjectedGetAllServiceCategoryController));
AdminRoute.post("/AddServiceCategory",InjectedGetAllServiceCategoryController.addServiceCategory.bind(InjectedGetAllServiceCategoryController))
AdminRoute.put('/EditService-category/:id',InjectedGetAllServiceCategoryController.editServiceCategory.bind(InjectedGetAllServiceCategoryController));
AdminRoute.delete('/DeleteService-category/:id',InjectedGetAllServiceCategoryController.deleteServiceCategory.bind(InjectedGetAllServiceCategoryController));

//Booking section
AdminRoute.get('/bookdetails',InjectedGetBookingsUse.getAllBookingDetails.bind(InjectedGetBookingsUse))

AdminRoute.get('/Bookdetails/:bookingId',InjectedGetBookingsUse.getBookingById.bind(InjectedGetBookingsUse))

//dashboard section
AdminRoute.get("/get-user-count",InjectedGetAllUserController.getUserCount.bind(InjectedGetAllUserController))
AdminRoute.get("/get-booking-count",InjectedGetBookingsUse.getBookingCount.bind(InjectedGetBookingsUse))
AdminRoute.get("/get-totalrevenue",InjectedDashboardController.getRevenue.bind(InjectedDashboardController))
AdminRoute.get("/get-revenueOvertime",InjectedDashboardController.getRevenueOvertime.bind(InjectedDashboardController))
AdminRoute.get("/get-bookingstatus",InjectedDashboardController.getbookingStatusDistribution.bind(InjectedDashboardController))

//banner section
AdminRoute.post('/banner/addBanner',InjectedBannerUse.createBanner.bind(InjectedBannerUse))
AdminRoute.get('/banner',InjectedBannerUse.GetAllBanner.bind(InjectedBannerUse))
AdminRoute.get('/banner/:BannerId',InjectedBannerUse.getBannerbyId.bind(InjectedBannerUse))
AdminRoute.post('/banner/updateBanner/:BannerId',InjectedBannerUse.editBanner.bind(InjectedBannerUse))
AdminRoute.delete('/banner/deleteBanner/:BannerId',InjectedBannerUse.deleteBanner.bind(InjectedBannerUse))

//payout section
AdminRoute.post('/initiate-payout',InjectedPayoutController.initiatePayout.bind(InjectedPayoutController))
AdminRoute.get('/payouts/:status',InjectedPayoutController.getPayouts.bind(InjectedPayoutController))



export default AdminRoute ;

