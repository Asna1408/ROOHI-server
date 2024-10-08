import mongoose from "mongoose";
import { ServiceType } from "../../types/user/ServicesType";

export interface UserGetSingleServiceUseCaseInterface{
      getsingleservice(serviceId:  mongoose.Types.ObjectId): Promise<ServiceType | null |any>
}