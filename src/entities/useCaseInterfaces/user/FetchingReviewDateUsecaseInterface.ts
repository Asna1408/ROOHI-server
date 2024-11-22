import { BookingType } from "../../types/user/BookingType";

export interface FetchingReviewDateUsecaseInterface{
    FetchBookingStatus(userId: string,serviceId:string,): Promise<BookingType | any> 
}