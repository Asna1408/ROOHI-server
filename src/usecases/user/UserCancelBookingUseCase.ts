import mongoose, { Types } from "mongoose";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { ObjectId } from "mongodb";
import { UserCancelBookingUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserCancelBookingUseCaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import Stripe from "stripe";
import { ServiceModel } from "../../frameworks/database/models/user/ServicesModel";

export class UserCancelBookingUseCase implements UserCancelBookingUseCaseInterface {


    constructor(private ibookingrepository: IBookingRepository,
      
    ) {}

    async cancelBooking(bookingId: string | mongoose.Types.ObjectId): Promise<void> {
        
        const bookingIdString = typeof bookingId === 'string' ? bookingId : bookingId.toString();

        const booking = await this.ibookingrepository.getBookingById(new mongoose.Types.ObjectId(bookingIdString));
        
        if (!booking) {
            throw new Error("Booking not found");
        }

        await this.ibookingrepository.updateBookingStatus(bookingIdString, 'canceled');

        const updateResult = await ServiceModel.updateOne(
            { _id: booking.service_id },
            { $addToSet: { availability: booking.booking_date } }
        );

        console.log("Service availability update result:", updateResult);


        // Refund the payment through Stripe
        
    }

}