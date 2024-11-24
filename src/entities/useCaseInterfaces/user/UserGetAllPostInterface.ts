import mongoose from "mongoose";

export interface UserGetAllPostUseCaseInterface{
    // GetAllPost(providerId: mongoose.Types.ObjectId):Promise<any>
    GetAllPost(providerId: mongoose.Types.ObjectId, skip: number, limit: number): Promise<{ services: any[]; total: number }> 
}