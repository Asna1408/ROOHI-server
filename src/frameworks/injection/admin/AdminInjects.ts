import { AdminAllBookingController } from "../../../interface adapter/controllers/admin/AdminAllBookigsController";
import { AdminLoginController } from "../../../interface adapter/controllers/admin/AdminLoginController";
import { BannerController } from "../../../interface adapter/controllers/admin/BannerController";
import { GetAllServiceController } from "../../../interface adapter/controllers/admin/GetAllServiceController";
import { GetAllUserController } from "../../../interface adapter/controllers/admin/GetAllUserController";
import { PayoutController } from "../../../interface adapter/controllers/admin/PayoutController";
import { AdminRepository } from "../../../interface adapter/respository/admin/AdminRepository";
import { AddServiceCategoryUseCase } from "../../../usecases/admin/AddServiceCategoryUseCase";
import { AdminLoginUseCase } from "../../../usecases/admin/AdminLoginUseCase";
import { BlockUserUseCase } from "../../../usecases/admin/BlockUserUseCase.ts";
import { CreateBannerUsecase } from "../../../usecases/admin/CreateBannerUsecase";
import { DeleteBannerUsecase } from "../../../usecases/admin/DeleteBannerUsecase";
import { DeleteServiceCategoryUseCase } from "../../../usecases/admin/DeleteServiceCategoryUseCase";
import { EditServiceCategoryUseCase } from "../../../usecases/admin/EditServiceCategoryUseCase";
import { GetAdminBookingByIdUseCase } from "../../../usecases/admin/GetAdminBookingByIdUseCase";
import { GetAllServiceCategoryUseCase } from "../../../usecases/admin/GetAllServiceCategoryUseCase";
import { GetAllUserUseCase } from "../../../usecases/admin/GetAllUserUseCase";
import { GetBannerByIdUsecase } from "../../../usecases/admin/GetBannerById";
import { GetBannerUsecase } from "../../../usecases/admin/GetBannerusecase";
import { GetBookingCountUsecase } from "../../../usecases/admin/GetBokkingCountUsecase";
import { GetBookingDetailsUsecase } from "../../../usecases/admin/GetBookingDetailsUsecase";
import { GetUserCountUsecase } from "../../../usecases/admin/GetUserCountUsecase";
import { UnblockUserUseCase } from "../../../usecases/admin/UnBlockUserUseCase";
import { UpdateBannerUsecase } from "../../../usecases/admin/UpdateBannerUsecase";
import { AdminDashboardUsecase } from "../../../usecases/admin/AdminDashboard";
import { AdminDashboardController } from "../../../interface adapter/controllers/admin/AdminDashboardController";
import { PayoutRepository } from "../../../interface adapter/respository/admin/PayoutRepository";
import { PayoutUseCase } from "../../../usecases/admin/PayoutUsecase";


const AdminMonoRepository = new AdminRepository()
const AdminPayoutRepository = new PayoutRepository()

//login
const AdminLoginUse = new AdminLoginUseCase(AdminMonoRepository)
export const InjectedAdminLoginController = new AdminLoginController(AdminLoginUse)

//UserList
const GetAllUsersUse = new GetAllUserUseCase(AdminMonoRepository)

//BlockUser
const BlockUserUse = new BlockUserUseCase(AdminMonoRepository)

//UnblockUser
const UnBlockUserUse = new UnblockUserUseCase(AdminMonoRepository)

//GetUserCount
const GetUserCountUse = new GetUserCountUsecase(AdminMonoRepository)

export const InjectedGetAllUserController = new GetAllUserController(GetAllUsersUse,BlockUserUse,UnBlockUserUse,GetUserCountUse)

//AddServiceCategory
const AddServiceCategoryUse = new AddServiceCategoryUseCase(AdminMonoRepository)

//EditServiceCategory
const EditServiceCategoryUse = new EditServiceCategoryUseCase(AdminMonoRepository)

//DeleteServiceCategory
const DeleteServiceCategoryUse = new DeleteServiceCategoryUseCase(AdminMonoRepository)

//GetAllServiceCategory
const GetAllServiceCategoryUse =new GetAllServiceCategoryUseCase(AdminMonoRepository)

export const InjectedGetAllServiceCategoryController = new GetAllServiceController(AddServiceCategoryUse,EditServiceCategoryUse,DeleteServiceCategoryUse,GetAllServiceCategoryUse,)

//GetAllBookings
const getAllBookingDetailsUse = new GetBookingDetailsUsecase(AdminMonoRepository)

//GetBookingsById
const getBookingByIdUse = new GetAdminBookingByIdUseCase(AdminMonoRepository)

//GetBookingCountUse
const GetBookingCountUse = new GetBookingCountUsecase(AdminMonoRepository)

export const InjectedGetBookingsUse = new AdminAllBookingController(getAllBookingDetailsUse,getBookingByIdUse,GetBookingCountUse)

//CreateBanner
const CreateBannerUse = new CreateBannerUsecase(AdminMonoRepository)

//getBanner
const GetBannerUse = new GetBannerUsecase(AdminMonoRepository)

//GetBannerById
const GetBannerByIdUse = new GetBannerByIdUsecase(AdminMonoRepository)

//updateBanner
const UpdateBannerUse = new UpdateBannerUsecase(AdminMonoRepository)

//deleteBanner
const DeleteBannerUse = new DeleteBannerUsecase(AdminMonoRepository)

export const InjectedBannerUse = new BannerController(CreateBannerUse,GetBannerUse,GetBannerByIdUse,UpdateBannerUse,DeleteBannerUse) 

//Payout 
const PayoutUse = new PayoutUseCase(AdminPayoutRepository)

export const InjectedPayoutController = new PayoutController(PayoutUse)

//dashboard
const DashboardUse = new AdminDashboardUsecase(AdminMonoRepository)

export const InjectedDashboardController = new AdminDashboardController(DashboardUse)


