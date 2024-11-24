import { ServiceCategory } from "../../entities/types/admin/ServiceCategoryType";
import { IGetAllServiceCategoryUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllServiceCategoryusecase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetAllServiceCategoryUseCase implements IGetAllServiceCategoryUseCase{

    constructor(private iadminrepository:IAdminRepository){}

    // async getServiceCategories(): Promise<any> {
    //     return this.iadminrepository.getServiceCategories();
    //   }

    async getServiceCategories(skip: number, limit: number): Promise<{ categories: ServiceCategory[]; total: number }> {
      const [categories, total] = await this.iadminrepository.getServiceCategories(skip, limit);
      return { categories, total };
    }
    

      async getServiceCategoryById(id: string): Promise<any> {
        return this.iadminrepository.getServiceCategoryById(id);
      }

}