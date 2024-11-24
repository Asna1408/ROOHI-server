import mongoose from "mongoose"
import { BookingType } from "../../../entities/types/user/BookingType"

export interface IBookingRepository{
    createBooking(BookingData:BookingType):Promise<BookingType | any> 
    getServiceDate(serviceId:string):Promise<any>
    getBookingById(bookingId: mongoose.Types.ObjectId): Promise<BookingType | null>; // Retrieve booking by ID
    getBookingdetailsById(bookingId: string): Promise<BookingType | any>
    updateBookingStatus(bookingId: string, status: string): Promise<void>;
    // findBookingsByUserId(userId: string): Promise<any[]> 
    findBookingsByUserId(userId: string, skip: number, limit: number): Promise<{ bookings: any[]; total: number }>
    // getBookingsByProviderId(providerId:string) :Promise<BookingType | any>
    getBookingsByProviderId(providerId: string, skip: number, limit: number): Promise<{ bookings: any[]; total: number }> 
    getBookingByUserAndService(userId: string, serviceId: string): Promise<BookingType | any> 


}