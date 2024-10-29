import mongoose, { Types } from "mongoose";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { ObjectId } from "mongodb";
import { UserCancelBookingUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserCancelBookingUseCaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import Stripe from "stripe";
import { ServiceModel } from "../../frameworks/database/models/user/ServicesModel";

export class UserCancelBookingUseCase implements UserCancelBookingUseCaseInterface {

    private stripe: Stripe;
    constructor(private ibookingrepository: IBookingRepository,
        private stripeSecretKey:string,
      
    ) {
        this.stripe = new Stripe(this.stripeSecretKey,);
    }

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

        if (updateResult.modifiedCount > 0) {
            console.log("Canceled date re-added to availability successfully.");
        } else {
            console.warn("Canceled date was already available.");
        }

        // Refund the payment through Stripe
        if (booking.paymentIntentId) {
            try {
                // Refund the payment via Stripe    
                const refund = await this.stripe.refunds.create({
                    payment_intent: booking.paymentIntentId
                });

                console.log("Refund successful:", refund.id);
            } catch (err) {
                console.error("Refund error:", err);
                throw new Error("Failed to process refund. Please try again later.");
            }
        }else {
            console.warn("No paymentIntentId found, skipping refund.");
        }
        
    }

}