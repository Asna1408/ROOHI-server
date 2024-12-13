import { ServiceCategory } from "../../entities/types/admin/ServiceCategoryType";
import { IEditServiceCategoryUseCase } from "../../entities/useCaseInterfaces/admin/IEditServiceCategoryUseCase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class EditServiceCategoryUseCase implements IEditServiceCategoryUseCase {
    constructor(private iadminrepository: IAdminRepository) {}
  
    async editServiceCategory(id: string, type_name: string, description: string): Promise<any> {
      try{
      return this.iadminrepository.editServiceCategory(id, type_name, description);
    }catch(error){
      throw new Error("Error occured when updating category")
         }
    }
  
  }
  