import { ServiceCategory } from "../../entities/types/admin/ServiceCategoryType";
import { IGetAllServiceCategoryUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllServiceCategoryusecase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetAllServiceCategoryUseCase implements IGetAllServiceCategoryUseCase{

    constructor(private iadminrepository:IAdminRepository){}

    async getServiceCategories(): Promise<any> {
        return this.iadminrepository.getServiceCategories();
      }

      async getServiceCategoryById(id: string): Promise<any> {
        return this.iadminrepository.getServiceCategoryById(id);
      }

}