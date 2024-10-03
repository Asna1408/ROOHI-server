
import { AdminType } from "../../../entities/types/admin/AdminType";
import { ServiceCategory } from "../../../entities/types/admin/ServiceCategoryType";
import { UserType } from "../../../entities/types/user/UserType";
import { AdminModel } from "../../../frameworks/database/models/admin/AdminModel";
import { ServiceCategoryModel } from "../../../frameworks/database/models/admin/ServiceCategoryModel";
import { UserModel } from "../../../frameworks/database/models/user/userModel";
import { IAdminRepository } from "./IAdminRepsitory";


export class AdminRepository implements IAdminRepository{

    async LoginAdmin(email:string):Promise<AdminType| null >{
        return await AdminModel.findOne({email});
    }

    async GetAllUsers():Promise< any >{
        return await UserModel.find().sort({ createdAt: -1 });
    }

    async BlockUser(userId: string): Promise<UserType | null> {
        return await UserModel.findByIdAndUpdate(
          userId,
          { isBlocked: true },
          { new: true }
        );
      }
    
      async UnblockUser(userId: string): Promise<UserType | null> {
        return await UserModel.findByIdAndUpdate(
          userId,
          { isBlocked: false },
          { new: true }
        );
      }

      async addServiceCategory(type_name: string, description: string): Promise<any> {
        const serviceCategory = new ServiceCategoryModel({ type_name, description });
        return await serviceCategory.save();
      }
    
      async getServiceCategories(): Promise<any> {
        return await ServiceCategoryModel.find();
      }
    
      async getServiceCategoryById(id: string): Promise<any> {
        return await ServiceCategoryModel.findById(id);
      }
    
      async editServiceCategory(id: string, type_name: string, description: string): Promise<any> {
        return await ServiceCategoryModel.findByIdAndUpdate(id, { type_name, description }, { new: true });
      }
    
      async deleteServiceCategory(id: string): Promise<any> {
        return await ServiceCategoryModel.findByIdAndDelete(id);
      }
}