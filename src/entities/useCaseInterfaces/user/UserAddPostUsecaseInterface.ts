import { Types } from "mongoose";
import { ServiceType } from "../../types/user/ServicesType";

export interface UserAddPostUsecaseInterface{
    
    createService(serviceData:ServiceType):Promise<any>
  }