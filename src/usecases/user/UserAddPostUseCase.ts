import { ServiceType } from "../../entities/types/user/ServicesType";
import { UserAddPostUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserAddPostUsecaseInterface";
import { ServiceCategoryModel } from "../../frameworks/database/models/admin/ServiceCategoryModel";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";

export class UserAddPostUseCase implements UserAddPostUsecaseInterface {
    constructor(private ipostrepository: IPostRepository) {}

    async createService(serviceData: ServiceType): Promise<any> {
        try {
            // Check if the service type exists
            const serviceCategory = await ServiceCategoryModel.findById(serviceData.service_type);
            if (!serviceCategory) {
                throw new Error('Invalid service type selected');
            }

            // Create a new service entry
            const newService = await this.ipostrepository.addService(serviceData);
            
            // Populate the service type field
            // await newService.populate('service_type'); // Ensure service_type is populated

            return newService; // Return the populated service
        } catch (error) {
            console.error("Error in UseCase createService:", error);
            throw error;  // Pass error back to the controller
        }
    }
}
