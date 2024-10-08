import { ServiceType } from "../../entities/types/user/ServicesType";
import { GetServiceAvailabiltyUsecaseInterface } from "../../entities/useCaseInterfaces/user/GetServiceAvailabiltyUsecaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";


export class GetServiceAvailabiltyUseCase implements GetServiceAvailabiltyUsecaseInterface {
    constructor(private ipostrepository: IPostRepository) {}

    async getdates(serviceId: string): Promise<Date[]> {
        const service = await this.ipostrepository.getPostById(serviceId);

        if (!service) {
            throw new Error('Service not found');
        }

        return service.availability; // Assuming availability is an array of Date objects
    }
}