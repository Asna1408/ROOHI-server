import { ServiceType } from "../../entities/types/user/ServicesType";
import { UserAddPostUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserAddPostUsecaseInterface";
import { ServiceCategoryModel } from "../../frameworks/database/models/admin/ServiceCategoryModel";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";

export class UserAddPostUseCase implements UserAddPostUsecaseInterface {
    constructor(private ipostrepository: IPostRepository) {}

    async createService(serviceData: ServiceType): Promise<any> {
        try {
            // Check if service type exists
            const serviceCategory = await ServiceCategoryModel.findById(serviceData.service_type);
            if (!serviceCategory) {
                throw new Error('Invalid service type selected');
            }

            // If the service type is valid, proceed to create the service
            const createdService = await this.ipostrepository.addService(serviceData);

            // Optionally, you can populate the service type on the created service here if your repository method does not do it
            const populatedService = await this.ipostrepository.getServiceById(createdService._id)
            

            // Return the populated service
            return populatedService;
        } catch (error) {
            console.error("Error in UseCase createService:", error);
            throw error;  // Pass error back to the controller
        }
    }
}
