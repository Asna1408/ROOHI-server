"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedDashboardController = exports.InjectedPayoutController = exports.InjectedBannerUse = exports.InjectedGetBookingsUse = exports.InjectedGetAllServiceCategoryController = exports.InjectedGetAllUserController = exports.InjectedAdminLoginController = void 0;
const AdminAllBookigsController_1 = require("../../../interface adapter/controllers/admin/AdminAllBookigsController");
const AdminLoginController_1 = require("../../../interface adapter/controllers/admin/AdminLoginController");
const BannerController_1 = require("../../../interface adapter/controllers/admin/BannerController");
const GetAllServiceController_1 = require("../../../interface adapter/controllers/admin/GetAllServiceController");
const GetAllUserController_1 = require("../../../interface adapter/controllers/admin/GetAllUserController");
const PayoutController_1 = require("../../../interface adapter/controllers/admin/PayoutController");
const AdminRepository_1 = require("../../../interface adapter/respository/admin/AdminRepository");
const AddServiceCategoryUseCase_1 = require("../../../usecases/admin/AddServiceCategoryUseCase");
const AdminLoginUseCase_1 = require("../../../usecases/admin/AdminLoginUseCase");
const BlockUserUseCase_ts_1 = require("../../../usecases/admin/BlockUserUseCase.ts");
const CreateBannerUsecase_1 = require("../../../usecases/admin/CreateBannerUsecase");
const DeleteBannerUsecase_1 = require("../../../usecases/admin/DeleteBannerUsecase");
const DeleteServiceCategoryUseCase_1 = require("../../../usecases/admin/DeleteServiceCategoryUseCase");
const EditServiceCategoryUseCase_1 = require("../../../usecases/admin/EditServiceCategoryUseCase");
const GetAdminBookingByIdUseCase_1 = require("../../../usecases/admin/GetAdminBookingByIdUseCase");
const GetAllServiceCategoryUseCase_1 = require("../../../usecases/admin/GetAllServiceCategoryUseCase");
const GetAllUserUseCase_1 = require("../../../usecases/admin/GetAllUserUseCase");
const GetBannerById_1 = require("../../../usecases/admin/GetBannerById");
const GetBannerusecase_1 = require("../../../usecases/admin/GetBannerusecase");
const GetBokkingCountUsecase_1 = require("../../../usecases/admin/GetBokkingCountUsecase");
const GetBookingDetailsUsecase_1 = require("../../../usecases/admin/GetBookingDetailsUsecase");
const GetUserCountUsecase_1 = require("../../../usecases/admin/GetUserCountUsecase");
const UnBlockUserUseCase_1 = require("../../../usecases/admin/UnBlockUserUseCase");
const UpdateBannerUsecase_1 = require("../../../usecases/admin/UpdateBannerUsecase");
const AdminDashboard_1 = require("../../../usecases/admin/AdminDashboard");
const AdminDashboardController_1 = require("../../../interface adapter/controllers/admin/AdminDashboardController");
const PayoutRepository_1 = require("../../../interface adapter/respository/admin/PayoutRepository");
const PayoutUsecase_1 = require("../../../usecases/admin/PayoutUsecase");
const AdminMonoRepository = new AdminRepository_1.AdminRepository();
const AdminPayoutRepository = new PayoutRepository_1.PayoutRepository();
//login
const AdminLoginUse = new AdminLoginUseCase_1.AdminLoginUseCase(AdminMonoRepository);
exports.InjectedAdminLoginController = new AdminLoginController_1.AdminLoginController(AdminLoginUse);
//UserList
const GetAllUsersUse = new GetAllUserUseCase_1.GetAllUserUseCase(AdminMonoRepository);
//BlockUser
const BlockUserUse = new BlockUserUseCase_ts_1.BlockUserUseCase(AdminMonoRepository);
//UnblockUser
const UnBlockUserUse = new UnBlockUserUseCase_1.UnblockUserUseCase(AdminMonoRepository);
//GetUserCount
const GetUserCountUse = new GetUserCountUsecase_1.GetUserCountUsecase(AdminMonoRepository);
exports.InjectedGetAllUserController = new GetAllUserController_1.GetAllUserController(GetAllUsersUse, BlockUserUse, UnBlockUserUse, GetUserCountUse);
//AddServiceCategory
const AddServiceCategoryUse = new AddServiceCategoryUseCase_1.AddServiceCategoryUseCase(AdminMonoRepository);
//EditServiceCategory
const EditServiceCategoryUse = new EditServiceCategoryUseCase_1.EditServiceCategoryUseCase(AdminMonoRepository);
//DeleteServiceCategory
const DeleteServiceCategoryUse = new DeleteServiceCategoryUseCase_1.DeleteServiceCategoryUseCase(AdminMonoRepository);
//GetAllServiceCategory
const GetAllServiceCategoryUse = new GetAllServiceCategoryUseCase_1.GetAllServiceCategoryUseCase(AdminMonoRepository);
exports.InjectedGetAllServiceCategoryController = new GetAllServiceController_1.GetAllServiceController(AddServiceCategoryUse, EditServiceCategoryUse, DeleteServiceCategoryUse, GetAllServiceCategoryUse);
//GetAllBookings
const getAllBookingDetailsUse = new GetBookingDetailsUsecase_1.GetBookingDetailsUsecase(AdminMonoRepository);
//GetBookingsById
const getBookingByIdUse = new GetAdminBookingByIdUseCase_1.GetAdminBookingByIdUseCase(AdminMonoRepository);
//GetBookingCountUse
const GetBookingCountUse = new GetBokkingCountUsecase_1.GetBookingCountUsecase(AdminMonoRepository);
exports.InjectedGetBookingsUse = new AdminAllBookigsController_1.AdminAllBookingController(getAllBookingDetailsUse, getBookingByIdUse, GetBookingCountUse);
//CreateBanner
const CreateBannerUse = new CreateBannerUsecase_1.CreateBannerUsecase(AdminMonoRepository);
//getBanner
const GetBannerUse = new GetBannerusecase_1.GetBannerUsecase(AdminMonoRepository);
//GetBannerById
const GetBannerByIdUse = new GetBannerById_1.GetBannerByIdUsecase(AdminMonoRepository);
//updateBanner
const UpdateBannerUse = new UpdateBannerUsecase_1.UpdateBannerUsecase(AdminMonoRepository);
//deleteBanner
const DeleteBannerUse = new DeleteBannerUsecase_1.DeleteBannerUsecase(AdminMonoRepository);
exports.InjectedBannerUse = new BannerController_1.BannerController(CreateBannerUse, GetBannerUse, GetBannerByIdUse, UpdateBannerUse, DeleteBannerUse);
//Payout 
const PayoutUse = new PayoutUsecase_1.PayoutUseCase(AdminPayoutRepository);
exports.InjectedPayoutController = new PayoutController_1.PayoutController(PayoutUse);
//dashboard
const DashboardUse = new AdminDashboard_1.AdminDashboardUsecase(AdminMonoRepository);
exports.InjectedDashboardController = new AdminDashboardController_1.AdminDashboardController(DashboardUse);
