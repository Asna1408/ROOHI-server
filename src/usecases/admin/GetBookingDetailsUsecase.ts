import { GetBookingDetailsUsecaseInterface } from "../../entities/useCaseInterfaces/admin/GetBookingDetailsUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetBookingDetailsUsecase implements GetBookingDetailsUsecaseInterface{
     constructor(private iadminrepository:IAdminRepository){}

async getAllBookingDetails() {
    try {
      const bookings = await this.iadminrepository. getBookingDetails();
      return bookings;
    } catch (error) {
      throw new Error('Failed to retrieve booking details: ' + error);
    }
  }

}