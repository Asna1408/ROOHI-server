import mongoose from "mongoose";
import { IReviewRepository } from "../../interface adapter/respository/user/IReviewRepository";
import { CreateReviewUsecaseInterface } from "../../entities/useCaseInterfaces/user/CreateReviewUsecaseInterface";
import { ReviewType } from "../../entities/types/user/ReviewType";

export class CreateReviewUsecase implements CreateReviewUsecaseInterface{
    constructor(private ireviewrepository:IReviewRepository){}

    async createReview(
        userId: string,
        serviceId:string,
        rating: number,
        review: string
      ):Promise<ReviewType> {
        return this.ireviewrepository.createReview(userId, serviceId, rating, review);
      }
    
}