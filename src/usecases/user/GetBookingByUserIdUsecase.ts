import mongoose from "mongoose";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { GetBookingByUserIdUsecaseInterface } from "../../entities/useCaseInterfaces/user/GetBookingByUserIdUsecaseInterface";



export class GetBookingByUserIdUsecase implements GetBookingByUserIdUsecaseInterface {
    constructor(private ibookingrepository: IBookingRepository,
    ) {}

   
    // async getbookByUserId(userId: string): Promise<any[]> {
    
    //     if (!userId) {
    //       throw new Error('User ID is required');
    //     }
    
    //     try {
    //       const bookings = await this.ibookingrepository.findBookingsByUserId(userId);
    //       if (!bookings.length) {
    //         throw new Error('No bookings found for this user');
    //       }
    //       return bookings;
    //     } catch (error) {
    //       throw new Error(" failed in fetching the details");
    //     }

    // }

    async getbookByUserId(userId: string, skip: number, limit: number): Promise<{ bookings: any[]; total: number }> {
      if (!userId) {
        throw new Error('User ID is required');
      }
    
      try {
        const { bookings, total } = await this.ibookingrepository.findBookingsByUserId(userId, skip, limit);
        return { bookings, total };
      } catch (error) {
        throw new Error("Failed to fetch booking details");
      }
    }
    
}