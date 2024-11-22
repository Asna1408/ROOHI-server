import { BookingType } from "../../types/user/BookingType";

export interface  GetBookingCountUsecaseInterface{
getBookingCount():Promise<BookingType>
}