import { ServiceCategory } from "../../types/admin/ServiceCategoryType";

export  interface IGetAllServiceCategoryUseCase{
    getServiceCategories(): Promise<any>;
    getServiceCategoryById(id: string): Promise<any>;
    
}



