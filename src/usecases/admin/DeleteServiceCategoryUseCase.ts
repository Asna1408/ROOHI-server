import { IDeleteServiceCategoryUseCase } from "../../entities/useCaseInterfaces/admin/IDeleteServiceCategoryUseCase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";



export class DeleteServiceCategoryUseCase implements IDeleteServiceCategoryUseCase {
    constructor(private iadminrepository: IAdminRepository) {}
  
    async deleteServiceCategory(id: string): Promise<any> {
      return this.iadminrepository.deleteServiceCategory(id);
    }
  }