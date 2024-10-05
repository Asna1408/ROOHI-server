import { ServiceType } from "../../../entities/types/user/ServicesType";
import { ServiceModel } from "../../../frameworks/database/models/user/ServicesModel";
import { IPostRepository } from "./IPostRepository";


export class PostRepository implements IPostRepository{
    async addService(serviceData:ServiceType):Promise<any>{
       const service = new ServiceModel(serviceData)
       return await service.save();
    }


    async getServiceById(id: string): Promise<ServiceType | null> {
        // Fetch the service by ID and populate the service_type field
        const service = await ServiceModel.findById(id).populate(' service_type');
        return service as unknown as ServiceType;
    }
}