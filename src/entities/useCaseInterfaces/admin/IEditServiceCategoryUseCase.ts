import { ServiceCategory } from "../../types/admin/ServiceCategoryType";

export  interface IEditServiceCategoryUseCase{
    editServiceCategory(id: string, type_name: string, description: string): Promise<any>;

}