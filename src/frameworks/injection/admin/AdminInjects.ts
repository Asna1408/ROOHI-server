import { AdminLoginController } from "../../../interface adapter/controllers/admin/AdminLoginController";
import { GetAllServiceController } from "../../../interface adapter/controllers/admin/GetAllServiceController";
import { GetAllUserController } from "../../../interface adapter/controllers/admin/GetAllUserController";
import { AdminRepository } from "../../../interface adapter/respository/admin/AdminRepository";
import { AddServiceCategoryUseCase } from "../../../usecases/admin/AddServiceCategoryUseCase";
import { AdminLoginUseCase } from "../../../usecases/admin/AdminLoginUseCase";
import { BlockUserUseCase } from "../../../usecases/admin/BlockUserUseCase.ts";
import { DeleteServiceCategoryUseCase } from "../../../usecases/admin/DeleteServiceCategoryUseCase";
import { EditServiceCategoryUseCase } from "../../../usecases/admin/EditServiceCategoryUseCase";
import { GetAllServiceCategoryUseCase } from "../../../usecases/admin/GetAllServiceCategoryUseCase";
import { GetAllUserUseCase } from "../../../usecases/admin/GetAllUserUseCase";
import { UnblockUserUseCase } from "../../../usecases/admin/UnBlockUserUseCase";


const AdminMonoRepository = new AdminRepository()

//login
const AdminLoginUse = new AdminLoginUseCase(AdminMonoRepository)
export const InjectedAdminLoginController = new AdminLoginController(AdminLoginUse)

//UserList
const GetAllUsersUse = new GetAllUserUseCase(AdminMonoRepository)

//BlockUser
const BlockUserUse = new BlockUserUseCase(AdminMonoRepository)

//UnblockUser
const UnBlockUserUse = new UnblockUserUseCase(AdminMonoRepository)

export const InjectedGetAllUserController = new GetAllUserController(GetAllUsersUse,BlockUserUse,UnBlockUserUse)

//AddServiceCategory
const AddServiceCategoryUse = new AddServiceCategoryUseCase(AdminMonoRepository)

//EditServiceCategory
const EditServiceCategoryUse = new EditServiceCategoryUseCase(AdminMonoRepository)

//DeleteServiceCategory
const DeleteServiceCategoryUse = new DeleteServiceCategoryUseCase(AdminMonoRepository)

//GetAllServiceCategory
const GetAllServiceCategoryUse =new GetAllServiceCategoryUseCase(AdminMonoRepository)

export const InjectedGetAllServiceCategoryController = new GetAllServiceController(AddServiceCategoryUse,EditServiceCategoryUse,DeleteServiceCategoryUse,GetAllServiceCategoryUse,)

