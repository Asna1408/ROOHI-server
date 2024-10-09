import mongoose from "mongoose"
import { BookingType } from "../../../entities/types/user/BookingType"

export interface IBookingRepository{
    createBooking(BookingData:BookingType):Promise<BookingType | any> 
    getServiceDate(serviceId:string):Promise<any>
}