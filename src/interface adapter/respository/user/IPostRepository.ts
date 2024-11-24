import mongoose from "mongoose";
import { ServiceType } from "../../../entities/types/user/ServicesType";

export interface IPostRepository{
    addService(serviceData:ServiceType):Promise<any>
    // getServicesByProvider(providerId: mongoose.Types.ObjectId): Promise<ServiceType[]>;
    getServicesByProvider(providerId: mongoose.Types.ObjectId, skip: number, limit: number): Promise<{ services: any[]; total: number }> 
    getPostById(postId: string): Promise<any>
    updatePost(postId: mongoose.Types.ObjectId, updatedData: any): Promise<any>
    deletePost(postId: mongoose.Types.ObjectId): Promise<any>
    getAllServices():Promise<any> 
    getsingleservice(serviceId: mongoose.Types.ObjectId): Promise<ServiceType | null| any>
}