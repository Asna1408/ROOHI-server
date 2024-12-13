import mongoose from "mongoose";
import ReviewModel from "../../../frameworks/database/models/user/ReviewModel";
import { ReviewType } from "../../../entities/types/user/ReviewType";
import { IReviewRepository } from "./IReviewRepository";


export class ReviewRepository implements IReviewRepository{

    async createReview(
        userId: string,
        serviceId: string,
        rating: number,
        review: string
      ): Promise<ReviewType | any > {
        try {
          if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(serviceId)) {
            throw new Error("Invalid userId or serviceId provided");
          }

          const userObjectId = new mongoose.Types.ObjectId(userId);
          const serviceObjectId = new mongoose.Types.ObjectId(serviceId);


          const newReview = new ReviewModel({ 
            user_id: userObjectId, 
            service_id: serviceObjectId, 
            rating, 
            review 
          });

          await newReview.save();
          return newReview;
        } catch (error) {
          console.error("Error while adding review:", error);
          throw new Error("Failed to add review");
        }
      }



      async getReviewsByService(service_id:mongoose.Types.ObjectId): Promise<ReviewType[]|any> {
try{
        return ReviewModel.find({ service_id }).populate('user_id', 'name').exec();

      }catch(error){
        throw new Error("error occured when finding the review by service")
      }
    }
}