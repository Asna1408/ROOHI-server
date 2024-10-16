import mongoose from "mongoose";
import { ReviewType } from "../../types/user/ReviewType";

export interface CreateReviewUsecaseInterface{
    createReview(
        userId: string,
        serviceId: string,
        rating: number,
        review: string
      ):Promise<ReviewType>
}