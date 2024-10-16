import { BookingType } from "../../types/user/BookingType";

export interface GetBookingbyProviderUsecaseInterface{
    getProviderBookings(providerId:string):Promise<BookingType|any>
}