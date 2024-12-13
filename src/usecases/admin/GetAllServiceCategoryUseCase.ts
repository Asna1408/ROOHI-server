import { ServiceCategory } from "../../entities/types/admin/ServiceCategoryType";
import { IGetAllServiceCategoryUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllServiceCategoryusecase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetAllServiceCategoryUseCase implements IGetAllServiceCategoryUseCase{

    constructor(private iadminrepository:IAdminRepository){}

    async getServiceCategories(skip: number, limit: number): Promise<{ categories: ServiceCategory[]; total: number }> {
      try{
      const [categories, total] = await this.iadminrepository.getServiceCategories(skip, limit);
      return { categories, total };
      }catch(error){
        throw new Error("error occured hwen fetching category")
      }
    }
    

      async getServiceCategoryById(id: string): Promise<any> {
        try{
        return this.iadminrepository.getServiceCategoryById(id);
        }catch(error){
          throw new Error("error on fetch category by Id")
        }
      }

}