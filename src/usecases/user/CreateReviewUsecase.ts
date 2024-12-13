import mongoose from "mongoose";
import { IReviewRepository } from "../../interface adapter/respository/user/IReviewRepository";
import { CreateReviewUsecaseInterface } from "../../entities/useCaseInterfaces/user/CreateReviewUsecaseInterface";
import { ReviewType } from "../../entities/types/user/ReviewType";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { BookingType } from "../../entities/types/user/BookingType";


export class CreateReviewUsecase implements CreateReviewUsecaseInterface{
    constructor(private ireviewrepository:IReviewRepository,
      private ibookingrepository:IBookingRepository
    ){}

    async createReview(
        userId: string,
        serviceId:string,
        rating: number,
        review: string
      ):Promise<ReviewType> {


        if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(serviceId)) {
          throw new Error("Invalid userId or serviceId provided");
      }

      try{
      const booking = await this.ibookingrepository.getBookingByUserAndService(userId, serviceId);
      if (!booking) {
          throw new Error("No booking found for this user and service");
      }

      // const currentDate = new Date();
      // const bookingDate = new Date(booking.booking_date);  

      // if (currentDate < bookingDate) {
      //   console.log("review can only be submitted after service done")
      //     throw new Error("Cannot leave a review after the booking date");
        
      // }
        return this.ireviewrepository.createReview(userId, serviceId,rating, review);
      
    }catch(error){
      throw new Error("Error occured when creating review")
    }
      }
    
}