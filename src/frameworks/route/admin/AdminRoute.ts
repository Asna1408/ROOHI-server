import { Router } from 'express'
export{ Router} from 'express'
import { InjectedGetAllServiceCategoryController, InjectedAdminLoginController,InjectedGetAllUserController, InjectedGetBookingsUse } from '../../injection/admin/AdminInjects';
import { Req, Res } from '../../Types/servertype';


const AdminRoute = Router();

AdminRoute.post("/admin_login",InjectedAdminLoginController.AdminLoginControl.bind(InjectedAdminLoginController))
AdminRoute.get('/logout', async(req: Req, res: Res)=> {
    try {
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
AdminRoute.get("/UserList",InjectedGetAllUserController.GetAllUserControl.bind(InjectedGetAllUserController))
AdminRoute.post("/block/:id",InjectedGetAllUserController.BlockUserControl.bind(InjectedGetAllUserController))
AdminRoute.post("/Unblock/:id",InjectedGetAllUserController.UnblockUserControl.bind(InjectedGetAllUserController))
AdminRoute.get("/ServiceList",InjectedGetAllServiceCategoryController.getServiceCategories.bind(InjectedGetAllServiceCategoryController))
AdminRoute.get("/service-category/:id", InjectedGetAllServiceCategoryController.getServiceCategoryById.bind(InjectedGetAllServiceCategoryController));
AdminRoute.post("/AddServiceCategory",InjectedGetAllServiceCategoryController.addServiceCategory.bind(InjectedGetAllServiceCategoryController))
AdminRoute.put('/EditService-category/:id',InjectedGetAllServiceCategoryController.editServiceCategory.bind(InjectedGetAllServiceCategoryController));
AdminRoute.delete('/DeleteService-category/:id',InjectedGetAllServiceCategoryController.deleteServiceCategory.bind(InjectedGetAllServiceCategoryController));
AdminRoute.get('/bookdetails',InjectedGetBookingsUse.getAllBookingDetails.bind(InjectedGetBookingsUse))
AdminRoute.get('/Bookdetails/:bookingId',InjectedGetBookingsUse.getBookingById.bind(InjectedGetBookingsUse))

export default AdminRoute ;

