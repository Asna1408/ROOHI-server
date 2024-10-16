import mongoose from "mongoose";
import { ReviewType } from "../../entities/types/user/ReviewType";
import { IReviewRepository } from "../../interface adapter/respository/user/IReviewRepository";
import { GetReviewByserviceIdUsecaseInterface } from "../../entities/useCaseInterfaces/user/GetReviewByserviceIdUsecaseInterface";

export class GetReviewByserviceIdUsecase implements GetReviewByserviceIdUsecaseInterface{
 constructor(private ireviewrepository : IReviewRepository ){}

async getReviewsByService(serviceId:mongoose.Types.ObjectId): Promise<ReviewType[] |any> {
    return this.ireviewrepository.getReviewsByService(serviceId);
  }
}