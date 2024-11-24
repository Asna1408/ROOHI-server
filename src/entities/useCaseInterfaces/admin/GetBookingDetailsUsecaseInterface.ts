import { BookingType } from "../../types/user/BookingType";

export interface GetBookingDetailsUsecaseInterface{
    // getAllBookingDetails():Promise<BookingType>
    getAllBookingDetails(page: number, limit: number):Promise<BookingType[]>
}