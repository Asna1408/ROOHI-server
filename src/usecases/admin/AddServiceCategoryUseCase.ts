import { ServiceCategory } from "../../entities/types/admin/ServiceCategoryType";
import { IAddServiceCategoryUseCase } from "../../entities/useCaseInterfaces/admin/IAddServiceCategoryUseCase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class AddServiceCategoryUseCase implements IAddServiceCategoryUseCase {
  constructor(private iadminrepository: IAdminRepository) {}

  async addServiceCategory(type_name: string, description: string): Promise<any> {
    try{
    return this.iadminrepository.addServiceCategory(type_name, description);
    }catch(error){
      throw new Error("Error occcured during the add service category")
    }
  }
}
