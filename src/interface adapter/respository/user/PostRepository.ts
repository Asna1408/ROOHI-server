import mongoose from "mongoose";
import { ServiceType } from "../../../entities/types/user/ServicesType";
import { ServiceModel } from "../../../frameworks/database/models/user/ServicesModel";
import { IPostRepository } from "./IPostRepository";


export class PostRepository implements IPostRepository{
    
  //addservice
  async addService(serviceData:ServiceType):Promise<any>{  
    try {
      const service = new ServiceModel(serviceData);
      return await service.save();
  } catch (error) {
      console.error("Error saving service to database:", error);
      throw error;
  }
   
    }

    async getServicesByProvider(providerId: mongoose.Types.ObjectId, skip: number, limit: number): Promise<{ services: any[]; total: number }> {
      try {
        const services = await ServiceModel.find({ provider_id: providerId })
          .populate("service_type", "type_name")
          .populate("provider_id", "name email phone location")
          .sort({ createdAt: -1 }) 
          .skip(skip)
          .limit(limit);
    
        const total = await ServiceModel.countDocuments({ provider_id: providerId }); 
    
        return { services, total };
      } catch (error) {
        throw new Error("Error fetching services");
      }
    }
    

    //get each service by id
      async getPostById(postId: string): Promise<any> {
        try {
        return await ServiceModel.findById(postId).exec()
         } catch (error) {
          throw new Error("Error fetching services By Id: " + error);
        }
      }

    //edit service
      async updatePost(postId: mongoose.Types.ObjectId, updatedData: any): Promise<any> {
        try {
        return await ServiceModel.findByIdAndUpdate(postId, updatedData, { new: true });
         } catch (error) {
          throw new Error("Error updating services: " + error);
        }
    }

    //delete service
    async deletePost(postId: mongoose.Types.ObjectId): Promise<any> {
      try {
        return await ServiceModel.findByIdAndDelete(postId);
      }catch (error) {
        throw new Error("Error deleting services: " + error);
      }
    }

    //To display all service in database in shop
    async getAllServices():Promise<any> {
      try {
        const services = await ServiceModel.find()
          .populate("provider_id") 
          .populate("service_type"); 
        return services;
      } catch (error) {
        throw new Error("Error fetching services: " + error);
      }
    }

    //get single service 
    async getsingleservice(serviceId: mongoose.Types.ObjectId): Promise<ServiceType | null| any> {
      try {
          const service = await ServiceModel.findById(serviceId).populate("provider_id","name").exec();
          return service;
      } catch (error) {
          throw new Error(`Error fetching service: ${error}`);
      }
  }


  
    
}