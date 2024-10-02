import { ServiceCategory } from "../../entities/types/admin/ServiceCategoryType";
import { IAddServiceCategoryUseCase } from "../../entities/useCaseInterfaces/admin/IAddServiceCategoryUseCase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class AddServiceCategoryUseCase implements IAddServiceCategoryUseCase {
  constructor(private iadminrepository: IAdminRepository) {}

  async addServiceCategory(type_name: string, description: string): Promise<any> {
    return this.iadminrepository.addServiceCategory(type_name, description);
  }
}
