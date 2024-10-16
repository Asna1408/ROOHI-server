import { BookingType } from "../../types/user/BookingType";

export interface GetBookingDetailsUsecaseInterface{
    getAllBookingDetails():Promise<BookingType>
}