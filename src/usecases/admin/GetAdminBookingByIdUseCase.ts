import { BookingType } from "../../entities/types/user/BookingType";
import { GetAdminBookingByIdUseCaseInterface } from "../../entities/useCaseInterfaces/admin/GetAdminBookingByIdUseCaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetAdminBookingByIdUseCase implements GetAdminBookingByIdUseCaseInterface{
    constructor(private  iadminrepositry: IAdminRepository ){}

    async GetBookingById(bookingId: string):Promise<BookingType> {
        try {
          const booking = await this.iadminrepositry.findBookingById(bookingId);
          if (!booking) {
            throw new Error('Booking not found');
          }
          return booking;
        } catch (error) {
          console.error('Error in use case execution:', error);
          throw new Error('Failed to retrieve booking');
        }
      }
}