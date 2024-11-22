import mongoose, { Types } from "mongoose";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { ObjectId } from "mongodb";
import { UserCancelBookingUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserCancelBookingUseCaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import Stripe from "stripe";
import { ServiceModel } from "../../frameworks/database/models/user/ServicesModel";
import { differenceInHours } from 'date-fns';


export class UserCancelBookingUseCase implements UserCancelBookingUseCaseInterface {

    private stripe: Stripe;
    private readonly REFUND_TIME_LIMIT_HOURS = 48; // User cancellation time limit for full refund
    private readonly PARTIAL_REFUND_PERCENTAGE = 0.5; // 50% refund if canceled late
      
      
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

        const hoursUntilBooking = differenceInHours(new Date(booking.booking_date), new Date());
        const refundAmount = hoursUntilBooking >= this.REFUND_TIME_LIMIT_HOURS
            ? booking.amount // Full refund
            : booking.amount * this.PARTIAL_REFUND_PERCENTAGE; // 50% refund

        // Refund the payment through Stripe
        if (booking.paymentIntentId  ) {
            try {
                // Refund the payment via Stripe    
                const refund = await this.stripe.refunds.create({
                    payment_intent: booking.paymentIntentId,
                    amount: Math.round(refundAmount * 100),
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

    async markBookingAsCompleted(bookingId: string | mongoose.Types.ObjectId): Promise<void> {
        try {
            const bookingIdString = typeof bookingId === 'string' ? bookingId : bookingId.toString();

            const booking = await this.ibookingrepository.getBookingById(new mongoose.Types.ObjectId(bookingIdString));
            
            if (!booking) {
                console.error(`Booking not found with ID: ${bookingIdString}`);
                throw new Error("Booking not found");
            }
            
            await this.ibookingrepository.updateBookingStatus(bookingIdString, 'completed');
        } catch (error) {
            console.error(`Error while completing the booking: ${error}`);
            throw new Error(`Error while completing the booking: ${error}`);
        }
    }
    

    
}