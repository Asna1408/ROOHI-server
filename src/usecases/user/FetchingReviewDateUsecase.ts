import { BookingType } from "../../entities/types/user/BookingType";
import { FetchingReviewDateUsecaseInterface } from "../../entities/useCaseInterfaces/user/FetchingReviewDateUsecaseInterface";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";

export class FetchingReviewDateUsecase implements FetchingReviewDateUsecaseInterface{
    constructor(private ibookingrepository:IBookingRepository
    ){}

 async FetchBookingStatus(userId: string,serviceId:string,): Promise<BookingType | any> {
   try{
   const booking = await this.ibookingrepository.getBookingByUserAndService(userId, serviceId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
   }catch(error){
      throw new Error("Error occured when Fetching Booking Status")
   }

   }
}