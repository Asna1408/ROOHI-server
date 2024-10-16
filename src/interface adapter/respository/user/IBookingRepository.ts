import mongoose from "mongoose"
import { BookingType } from "../../../entities/types/user/BookingType"

export interface IBookingRepository{
    createBooking(BookingData:BookingType):Promise<BookingType | any> 
    getServiceDate(serviceId:string):Promise<any>
    getBookingById(bookingId: mongoose.Types.ObjectId): Promise<BookingType | null>; // Retrieve booking by ID
    updateBookingStatus(bookingId: string, status: string): Promise<void>;
    findBookingsByUserId(userId: string): Promise<any[]> 
    getBookingsByProviderId(providerId:string) :Promise<BookingType | any>

}