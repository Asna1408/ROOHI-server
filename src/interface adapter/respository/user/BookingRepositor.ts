import mongoose from "mongoose";
import { BookingType } from "../../../entities/types/user/BookingType";
import BookingModel from "../../../frameworks/database/models/user/BookingModel";
import { IBookingRepository } from "./IBookingRepository";
import { ServiceModel } from "../../../frameworks/database/models/user/ServicesModel";

export class BookingRepository implements IBookingRepository{
    async createBooking(BookingData:BookingType):Promise<BookingType | any> {
      try {
        return await BookingModel.create(BookingData);
      } catch (error) {
        throw new Error("Error on creating Booking");
      }
    }

    async getServiceDate(serviceId: string): Promise<any> {
      try {
        return await BookingModel.find({ service_id: serviceId }).select('booking_date -_id').exec();
      } catch (error) {
        throw new Error("Error on getting services date");
      }
    }
    
    async getBookingById(bookingId: mongoose.Types.ObjectId): Promise<BookingType | null> {
      try {
      const booking = await BookingModel.findById(bookingId).lean().exec();

        if (!booking) return null;
        return booking as BookingType; 
      } catch (error) {
        throw new Error(`Unable to fetch booking with ID: ${bookingId}. Error: ${error}`);
      }
    }


    async getBookingdetailsById(bookingId: string): Promise<BookingType | any> {
        try {
          return await BookingModel.findById(bookingId).populate('service_id').populate('user_id','name email phone');
        } catch (error) {
          throw new Error(`Unable to fetch booking details with ID: ${bookingId}. Error: ${error}`);
        }
      }

    async updateBookingStatus(bookingId: string, status: string): Promise<void> {
      try {
      await BookingModel.findByIdAndUpdate(bookingId, { status }).exec();
    } catch (error) {
      throw new Error("Error on updating the booking status");
    }
    }


    async findBookingsByUserId(userId: string, skip: number, limit: number): Promise<{ bookings: any[]; total: number }> {
      try {
      const bookings = await BookingModel.find({ user_id: userId })
        .populate('service_id', 'service_name')
        .sort({ booking_date: -1 }) 
        .skip(skip)
        .limit(limit)
        .exec();
    
      const total = await BookingModel.countDocuments({ user_id: userId }); 
      return { bookings, total };
    } catch (error) {
      throw new Error("Error due to fetch the booking Data by userId");
    }
    }

      async getBookingsByProviderId(providerId: string, skip: number, limit: number): Promise<{ bookings: any[]; total: number }> {
        try{
        const bookings = await BookingModel.find({ provider_id: providerId })
          .populate('user_id', 'name email')
          .populate('service_id', 'service_name price')
          .sort({ booking_date: -1 }) 
          .skip(skip)
          .limit(limit)
          .exec();
      
        const total = await BookingModel.countDocuments({ provider_id: providerId }); 
        return { bookings, total };
      } catch (error) {
        throw new Error("Error occured on fetching booking by provider id");
      }
      }
      

//for review and rating
      async getBookingByUserAndService(userId: string, serviceId: string): Promise<BookingType | any> {
        try{
        return await BookingModel.findOne({ user_id: userId, service_id: serviceId }).select('status').exec();
      } catch (error) {
        throw new Error("Error on fetching the booking by user and service for review");
      }
    }

   
    
}