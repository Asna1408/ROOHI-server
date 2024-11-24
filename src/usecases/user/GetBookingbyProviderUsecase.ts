
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import { BookingType } from "../../entities/types/user/BookingType";
import { GetBookingbyProviderUsecaseInterface } from "../../entities/useCaseInterfaces/user/GetBookingbyProviderUsecaseInterface";



export class GetBookingbyProviderUsecase implements GetBookingbyProviderUsecaseInterface {
    constructor(private ibookingrepository: IBookingRepository,
    ) {}

    // async getProviderBookings(providerId:string):Promise<BookingType | any>{      
    
    //   if (!providerId) {
    //     throw new Error('Provider ID not found');
    //   }

    // try{
    //   const bookings = await this.ibookingrepository.getBookingsByProviderId(providerId);
    //   if (!bookings.length) {
    //     throw new Error('No bookings found for this user');
    //   }
    //   return bookings;
    // }catch{
    //     throw new Error(" failed in fetching the details");
    //   }
    // };

    async getProviderBookings(providerId: string, skip: number, limit: number): Promise<{ bookings: any[]; total: number }> {
      if (!providerId) {
        throw new Error('Provider ID not found');
      }
    
      try {
        const { bookings, total } = await this.ibookingrepository.getBookingsByProviderId(providerId, skip, limit);
        return { bookings, total };
      } catch (error) {
        throw new Error("Failed in fetching the details");
      }
    }
    
   
}