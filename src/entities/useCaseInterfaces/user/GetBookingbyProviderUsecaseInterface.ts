import { BookingType } from "../../types/user/BookingType";

export interface GetBookingbyProviderUsecaseInterface{
    // getProviderBookings(providerId:string):Promise<BookingType|any>
    getProviderBookings(providerId: string, skip: number, limit: number): Promise<{ bookings: any[]; total: number }>

}