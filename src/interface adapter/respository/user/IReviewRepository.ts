import mongoose from "mongoose";
import { ReviewType } from "../../../entities/types/user/ReviewType";

export interface IReviewRepository{
     createReview(
        userId: string,
        serviceId: string,
        rating: number,
        review: string
      ): Promise<ReviewType |  any> 

      getReviewsByService(serviceId:mongoose.Types.ObjectId): Promise<ReviewType[]|any>
}