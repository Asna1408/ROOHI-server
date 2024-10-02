import { AdminType } from "../../../entities/types/admin/AdminType";
import { ServiceCategory } from "../../../entities/types/admin/ServiceCategoryType";
import { UserType } from "../../../entities/types/user/UserType";


export interface IAdminRepository{
    LoginAdmin(email:string):Promise< AdminType | null >
    GetAllUsers():Promise<any>
    BlockUser(userId: string): Promise<UserType | null>;
    UnblockUser(userId: string): Promise<UserType | null>;
    addServiceCategory(type_name: string, description: string): Promise<any>;
  getServiceCategories(): Promise<any>;

  getServiceCategoryById(id: string): Promise<any>;
  editServiceCategory(id: string, type_name: string, description: string): Promise<any>;
  deleteServiceCategory(id: string): Promise<any>;

}