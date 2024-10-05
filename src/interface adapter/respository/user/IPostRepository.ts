import { ServiceType } from "../../../entities/types/user/ServicesType";

export interface IPostRepository{
    addService(serviceData:ServiceType):Promise<any>
    getServiceById(id: string): Promise<ServiceType | null>;
}