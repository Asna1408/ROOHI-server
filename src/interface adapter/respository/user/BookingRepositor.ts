import mongoose from "mongoose";
import { BookingType } from "../../../entities/types/user/BookingType";
import BookingModel from "../../../frameworks/database/models/user/BookingModel";
import { IBookingRepository } from "./IBookingRepository";
import { ServiceModel } from "../../../frameworks/database/models/user/ServicesModel";

export class BookingRepository implements IBookingRepository{
    async createBooking(BookingData:BookingType):Promise<BookingType | any> {
        return await BookingModel.create(BookingData);
    }

    async getServiceDate(serviceId: string): Promise<any> {
        return await BookingModel.find({ service_id: serviceId }).select('booking_date -_id').exec();
    }
    
    async getBookingById(bookingId: mongoose.Types.ObjectId): Promise<BookingType | null> {
        const booking = await BookingModel.findById(bookingId).lean().exec();

        if (!booking) return null;

        return booking as BookingType; // Directly return the result as BookingType
    }


    async getBookingdetailsById(bookingId: string): Promise<BookingType | any> {
        try {
          // Assuming your BookingModel has a reference to ServiceModel in 'service_id'
          return await BookingModel.findById(bookingId).populate('service_id').populate('user_id','name email phone');
        } catch (error) {
          throw new Error(`Unable to fetch booking with ID: ${bookingId}. Error: ${error}`);
        }
      }

    async updateBookingStatus(bookingId: string, status: string): Promise<void> {
        await BookingModel.findByIdAndUpdate(bookingId, { status }).exec();
    }

    async findBookingsByUserId(userId: string): Promise<any[]> {
          const bookings = await BookingModel.find({user_id:userId}).populate('service_id', 'service_name').exec();
          return bookings;
       
      }


      async getBookingsByProviderId(providerId:string) :Promise<BookingType | any>{
        return await BookingModel.find({ provider_id: providerId })
          .populate('user_id', 'name email')
          .populate('service_id', 'service_name price');
      };


//for review and rating
      async getBookingByUserAndService(userId: string, serviceId: string): Promise<BookingType | any> {
        return await BookingModel.findOne({ user_id: userId, service_id: serviceId }).select('booking_date').exec();
    }

     
      
    
}