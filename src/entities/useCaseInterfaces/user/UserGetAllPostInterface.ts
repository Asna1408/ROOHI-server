import mongoose from "mongoose";

export interface UserGetAllPostUseCaseInterface{
    GetAllPost(providerId: mongoose.Types.ObjectId):Promise<any>
}