import mongoose from "mongoose";
import { BookingType } from "../../../entities/types/user/BookingType";
import BookingModel from "../../../frameworks/database/models/user/BookingModel";
import { IBookingRepository } from "./IBookingRepository";
import { ServiceModel } from "../../../frameworks/database/models/user/ServicesModel";

export class BookingRepository implements IBookingRepository{
    async createBooking(BookingData:BookingType):Promise<BookingType | any> {
        return await BookingModel.create(BookingData);
    }

    
    

    
}