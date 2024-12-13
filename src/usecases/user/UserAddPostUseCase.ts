import { ServiceType } from "../../entities/types/user/ServicesType";
import { UserAddPostUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserAddPostUsecaseInterface";
import { ServiceCategoryModel } from "../../frameworks/database/models/admin/ServiceCategoryModel";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";

export class UserAddPostUseCase implements UserAddPostUsecaseInterface {
    constructor(private ipostrepository: IPostRepository) {}

    async createService(serviceData: ServiceType): Promise<any> {
        try {
            const serviceCategory = await ServiceCategoryModel.findById(serviceData.service_type);
            if (!serviceCategory) {
                throw new Error('Invalid service type selected');
            }

            const newService = await this.ipostrepository.addService(serviceData);

            return newService; 
        } catch (error) {
            console.error("Error in UseCase createService:", error);
            throw error;  
        }
    }
}
