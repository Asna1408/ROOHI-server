import { BookingType } from "../../entities/types/user/BookingType";
import { GetBookingDetailsUsecaseInterface } from "../../entities/useCaseInterfaces/admin/GetBookingDetailsUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetBookingDetailsUsecase implements GetBookingDetailsUsecaseInterface{
     constructor(private iadminrepository:IAdminRepository){}

// async getAllBookingDetails() {
//     try {
//       const bookings = await this.iadminrepository. getBookingDetails();
//       return bookings;
//     } catch (error) {
//       throw new Error('Failed to retrieve booking details: ' + error);
//     }
//   }

async getAllBookingDetails(page: number, limit: number):Promise<BookingType[]|any> {
  try {
    const skip = (page - 1) * limit;
    const [bookings, total] = await this.iadminrepository.getBookingDetails(skip, limit);
    
    return {
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    throw new Error('Failed to retrieve booking details: ' + error);
  }
}



}