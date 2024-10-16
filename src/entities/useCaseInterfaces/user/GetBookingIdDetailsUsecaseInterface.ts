import { BookingType } from "../../types/user/BookingType";

export interface GetBookingIdDetailsUsecaseInterface{
    getbookingdetailsById(BookingId: string): Promise<BookingType | null>
}