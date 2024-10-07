import mongoose from "mongoose";
import { ServiceType } from "../../../entities/types/user/ServicesType";
import { ServiceModel } from "../../../frameworks/database/models/user/ServicesModel";
import { IPostRepository } from "./IPostRepository";


export class PostRepository implements IPostRepository{
    async addService(serviceData:ServiceType):Promise<any>{
       const service = new ServiceModel(serviceData)
       return await service.save();
   
    }

    async getServicesByProvider(providerId: mongoose.Types.ObjectId): Promise<any> {
        try {
          // Assuming you have a Service model with the provider_id reference
          const services = await ServiceModel.find({ provider_id: providerId }).populate("service_type");
          return services;
        } catch (error) {
          throw new Error("Error fetching services");
        }  
      }

      async getPostById(postId: string): Promise<any> {
        return await ServiceModel.findById(postId)
      }

      async updatePost(postId: mongoose.Types.ObjectId, updatedData: any): Promise<any> {
        return await ServiceModel.findByIdAndUpdate(postId, updatedData, { new: true });
    }

    async deletePost(postId: mongoose.Types.ObjectId): Promise<any> {
        return await ServiceModel.findByIdAndDelete(postId);
    }
    
}