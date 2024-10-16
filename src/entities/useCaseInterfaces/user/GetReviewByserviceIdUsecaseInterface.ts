import mongoose from "mongoose";
import { ReviewType } from "../../types/user/ReviewType";

export interface GetReviewByserviceIdUsecaseInterface{
    getReviewsByService(serviceId:mongoose.Types.ObjectId): Promise<ReviewType[] |any>
}