import { BookingType } from "../../types/user/BookingType";

export interface GetAdminBookingByIdUseCaseInterface{
    GetBookingById(bookingId: string):Promise<BookingType>
}