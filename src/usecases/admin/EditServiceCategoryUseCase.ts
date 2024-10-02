import { ServiceCategory } from "../../entities/types/admin/ServiceCategoryType";
import { IEditServiceCategoryUseCase } from "../../entities/useCaseInterfaces/admin/IEditServiceCategoryUseCase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class EditServiceCategoryUseCase implements IEditServiceCategoryUseCase {
    constructor(private iadminrepository: IAdminRepository) {}
  
    async editServiceCategory(id: string, type_name: string, description: string): Promise<any> {
      return this.iadminrepository.editServiceCategory(id, type_name, description);
    }
  
  }
  