import { BookingType } from "../../entities/types/user/BookingType";
import { GetBookingIdDetailsUsecaseInterface } from "../../entities/useCaseInterfaces/user/GetBookingIdDetailsUsecaseInterface";
import { BookingRepository } from "../../interface adapter/respository/user/BookingRepositor";


export class GetBookingIdDetailsUsecase implements GetBookingIdDetailsUsecaseInterface {
    private bookingRepository: BookingRepository;
  
    constructor(bookingRepository: BookingRepository) {
      this.bookingRepository = bookingRepository;
    }
  
    async getbookingdetailsById(BookingId: string): Promise<BookingType | null> {
      if (!BookingId) {
        throw new Error('Booking ID is required');
      }
  
      const booking = await this.bookingRepository.getBookingdetailsById(BookingId);
  
      if (!booking) {
        throw new Error('Booking not found');
      }
  
      return booking;
    }
  }