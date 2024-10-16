
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import { BookingType } from "../../entities/types/user/BookingType";
import { GetBookingbyProviderUsecaseInterface } from "../../entities/useCaseInterfaces/user/GetBookingbyProviderUsecaseInterface";



export class GetBookingbyProviderUsecase implements GetBookingbyProviderUsecaseInterface {
    constructor(private ibookingrepository: IBookingRepository,
    ) {}

    async getProviderBookings(providerId:string):Promise<BookingType | any>{
      // Get the service to extract the provider ID
      
    
      if (!providerId) {
        throw new Error('Provider ID not found');
      }

    try{
      const bookings = await this.ibookingrepository.getBookingsByProviderId(providerId);
      if (!bookings.length) {
        throw new Error('No bookings found for this user');
      }
      return bookings;
    }catch{
        throw new Error(" failed in fetching the details");
      }
    };
   
}