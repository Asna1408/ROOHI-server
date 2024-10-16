import mongoose from "mongoose";
import { UserCancelBookingUseCaseInterface } from "../../../entities/useCaseInterfaces/user/UserCancelBookingUseCaseInterface";
import { UserCreateBookingUsecaseInterface } from "../../../entities/useCaseInterfaces/user/UserCreateBookingUsecaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";
import Stripe from 'stripe';
import { GetBookingByUserIdUsecaseInterface } from "../../../entities/useCaseInterfaces/user/GetBookingByUserIdUsecaseInterface";
import { GetBookingbyProviderUsecaseInterface } from "../../../entities/useCaseInterfaces/user/GetBookingbyProviderUsecaseInterface";
import { GetBookingIdDetailsUsecase } from "../../../usecases/user/GetBookingIdDetailsUsecase";
import { GetBookingIdDetailsUsecaseInterface } from "../../../entities/useCaseInterfaces/user/GetBookingIdDetailsUsecaseInterface";
const stripe = new Stripe('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');
  

export class BookingController {
    constructor(private icreatebookingUsecaseinterface: UserCreateBookingUsecaseInterface,
            private icancelBookingUsecaseInterface:UserCancelBookingUseCaseInterface,
            private igetBookingUsecaseInterface:GetBookingByUserIdUsecaseInterface,
           private igetbookingbyproviderIdUsecaseInterface: GetBookingbyProviderUsecaseInterface,
            private igetbookDetailsbyIdusecaseInterface:GetBookingIdDetailsUsecaseInterface
    ){}

    // Controller to create a checkout session
    async createCheckoutSession(req: Req, res: Res) {
        const { serviceId, userId, selectedDate, amount, currency } = req.body;

        try {
            
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'], 
                line_items: [
                    {
                        price_data: {
                            currency: currency,
                            product_data: {
                                name: `Booking for service ID: ${serviceId}`, 
                            },
                            unit_amount: amount, // Amount in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`, // Redirect after payment success
                cancel_url: `${req.headers.origin}/booking/cancel`, 
            });

           
            const booking = await this.icreatebookingUsecaseinterface.CreateBook(
                serviceId,
                userId,
                new Date(selectedDate), 
                'pending', 
                session.id 
            );

            res.status(201).json({ success: true, sessionId: session.id });
        } catch (error) {
            const err = error as Error; 
            console.error('Payment error:', err.message); 
            res.status(500).json({ error: err.message });
        }
    }


    async cancelBooking(req: Req, res: Res) {
        const { bookingId } = req.params;

        try {
            
            const bookingObjectId = new mongoose.Types.ObjectId(bookingId);

            await this.icancelBookingUsecaseInterface.cancelBooking(bookingObjectId);
            res.status(200).json({ success: true, message: "Booking cancelled and refund processed." });
        } catch (error) {
            const err = error as Error;
            console.error('Cancellation error:', err.message);
            res.status(500).json({ error: err.message });
        }
    }

async getbookByUserId(req:Req,res:Res){
        const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const bookings = await this.igetBookingUsecaseInterface.getbookByUserId(userId);

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    return res.status(200).json(bookings);

  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ error: "Failed to fetch booking details", details: error });
  }
    }


    


      async getBookingDetailsById(req: Req, res: Res): Promise<void> {
        try {
          const bookingId = req.params.bookingId;
          const booking = await this.igetbookDetailsbyIdusecaseInterface.getbookingdetailsById(bookingId);
    
          res.status(200).json(booking);
        } catch (error) {
          res.status(500).json({ error: `booking failed ${error}`});
        }
      }


      async getProviderBookingsController(req:Req, res:Res) {
           const { providerId } = req.params;
        
        try {
          if (!providerId) {
            return res.status(400).json({ error: "User ID is required" });
          }

          const isValidObjectId = mongoose.Types.ObjectId.isValid(providerId);
    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid Provider ID format" });
    }
      
    const bookings = await this.igetbookingbyproviderIdUsecaseInterface.getProviderBookings(providerId);
      
          return res.status(200).json(bookings);
        } catch (error) {
          return res.status(500).json({ message: error});
        }
      };
}

