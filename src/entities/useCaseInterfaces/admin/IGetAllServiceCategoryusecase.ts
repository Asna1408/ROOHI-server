import { ServiceCategory } from "../../types/admin/ServiceCategoryType";

export  interface IGetAllServiceCategoryUseCase{
    // getServiceCategories(): Promise<any>;
    getServiceCategories(skip: number, limit: number): Promise<{ categories: ServiceCategory[]; total: number }>
    getServiceCategoryById(id: string): Promise<any>;
    
}



