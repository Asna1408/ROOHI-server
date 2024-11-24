import mongoose from "mongoose";
import { UserCancelBookingUseCaseInterface } from "../../../entities/useCaseInterfaces/user/UserCancelBookingUseCaseInterface";
import { UserCreateBookingUsecaseInterface } from "../../../entities/useCaseInterfaces/user/UserCreateBookingUsecaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";
import Stripe from 'stripe';
import { GetBookingByUserIdUsecaseInterface } from "../../../entities/useCaseInterfaces/user/GetBookingByUserIdUsecaseInterface";
import { GetBookingbyProviderUsecaseInterface } from "../../../entities/useCaseInterfaces/user/GetBookingbyProviderUsecaseInterface";
import { GetBookingIdDetailsUsecase } from "../../../usecases/user/GetBookingIdDetailsUsecase";
import { GetBookingIdDetailsUsecaseInterface } from "../../../entities/useCaseInterfaces/user/GetBookingIdDetailsUsecaseInterface";
import { FetchingReviewDateUsecaseInterface } from "../../../entities/useCaseInterfaces/user/FetchingReviewDateUsecaseInterface";
const stripe = new Stripe('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');
  

export class BookingController {
    constructor(private icreatebookingUsecaseinterface: UserCreateBookingUsecaseInterface,
            private icancelBookingUsecaseInterface:UserCancelBookingUseCaseInterface,
            private igetBookingUsecaseInterface:GetBookingByUserIdUsecaseInterface,
           private igetbookingbyproviderIdUsecaseInterface: GetBookingbyProviderUsecaseInterface,
            private igetbookDetailsbyIdusecaseInterface:GetBookingIdDetailsUsecaseInterface,
            private ifetchReviewdateUsecaseinterface : FetchingReviewDateUsecaseInterface
    ){}

    // Controller to create a checkout session
    // async createCheckoutSession(req: Req, res: Res) {
    //     const { serviceId, userId, selectedDate, amount, currency } = req.body;

    //     try {
            
    //         const session = await stripe.checkout.sessions.create({
    //             payment_method_types: ['card'], 
    //             line_items: [
    //                 {
    //                     price_data: {
    //                         currency: currency,
    //                         product_data: {
    //                             name: `Booking for service ID: ${serviceId}`, 
    //                         },
    //                         unit_amount: amount, // Amount in cents
    //                     },
    //                     quantity: 1,
    //                 },
    //             ],
    //             mode: 'payment',
    //             success_url: `${req.headers.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`, // Redirect after payment success
    //             cancel_url: `${req.headers.origin}/booking/cancel`, 
    //         });

           
    //         const booking = await this.icreatebookingUsecaseinterface.CreateBook(
    //             serviceId,
    //             userId,
    //             new Date(selectedDate), 
    //             'pending', 
    //             session.id 
    //         );

    //         res.status(201).json({ success: true, sessionId: session.id });
    //     } catch (error) {
    //         const err = error as Error; 
    //         console.error('Payment error:', err.message); 
    //         res.status(500).json({ error: err.message });
    //     }
    // }

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
              success_url: `${req.headers.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}&service_id=${serviceId}&user_id=${userId}&selected_date=${selectedDate}`, // Redirect after payment success
              cancel_url: `${req.headers.origin}/booking/cancel`, 
          });

          res.status(201).json({ success: true, sessionId: session.id });
      } catch (error) {
          const err = error as Error; 
          console.error('Payment error:', err.message); 
          res.status(500).json({ error: err.message });
      }
  }


  async verifyPaymentAndCreateBooking(req: Req, res: Res) {
    const sessionId = req.query.session_id as string;
    const serviceId = req.query.service_id as string;
    const userId = req.query.user_id as string;
    const selectedDate = req.query.selected_date as string;

    if (!sessionId || !serviceId || !userId || !selectedDate) {
        console.error("Session ID or parameters are missing");
        return res.status(400).json({ error: "Session ID and parameters are required" });
    }

    try {
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Ensure the session is paid and has a payment intent ID
        if (session.payment_status === "paid" && session.payment_intent) {
          const amount = session.amount_total ? session.amount_total / 100 : 0; // Amount in currency units

            const booking = await this.icreatebookingUsecaseinterface.CreateBook(
                new mongoose.Types.ObjectId(serviceId),
                new mongoose.Types.ObjectId(userId),
                new Date(selectedDate),
                "confirmed",
                sessionId,
                session.payment_intent.toString(),
                 amount
            );

            res.status(201).json({ success: true, booking });
        } else {
            throw new Error("Payment was not successful");
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ error: "Verification failed" });
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

    async completeBooking(req: Req, res: Res) {
      const { bookingId } = req.params;
    
      try {
          // Convert bookingId to ObjectId and validate it
          const bookingObjectId = new mongoose.Types.ObjectId(bookingId);

          await this.icancelBookingUsecaseInterface.markBookingAsCompleted(bookingObjectId);
  
          res.status(200).json({
              message: 'Booking has been successfully marked as completed',
          });
      } catch (error) {
          console.error('Error completing booking:', error);
          res.status(500).json({
              message: 'Error completing booking',
              error: error // Add the error message to the response
          });
      }
  }
  

// async getbookByUserId(req:Req,res:Res){
//         const { userId } = req.params;

//   try {
//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
//     if (!isValidObjectId) {
//       return res.status(400).json({ error: "Invalid User ID format" });
//     }

//     const bookings = await this.igetBookingUsecaseInterface.getbookByUserId(userId);

//     if (!bookings || bookings.length === 0) {
//       return res.status(404).json({ message: "No bookings found for this user" });
//     }

//     return res.status(200).json(bookings);

//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     return res.status(500).json({ error: "Failed to fetch booking details", details: error });
//   }
//     }


async getbookByUserId(req:Req,res:Res){
          const { userId } = req.params;
          const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
          const limit = parseInt(req.query.limit as string, 10) || 10; // Default to 10 items per page
          const skip = (page - 1) * limit;
  
    try {
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
      if (!isValidObjectId) {
        return res.status(400).json({ error: "Invalid User ID format" });
      }
  
      const { bookings, total } = await this.igetBookingUsecaseInterface.getbookByUserId(userId, skip, limit);
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: "No bookings found for this user" });
      }
  
      return res.status(200).json({
        bookings,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });
  
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


    //   async getProviderBookingsController(req:Req, res:Res) {
    //        const { providerId } = req.params;

    //     try {
    //       if (!providerId) {
    //         return res.status(400).json({ error: "User ID is required" });
    //       }
    //       const isValidObjectId = mongoose.Types.ObjectId.isValid(providerId);
    // if (!isValidObjectId) {
    //   return res.status(400).json({ error: "Invalid Provider ID format" });
    // }
      
    // const bookings = await this.igetbookingbyproviderIdUsecaseInterface.getProviderBookings(providerId);
    //       return res.status(200).json(bookings);
    //     } catch (error) {
    //       return res.status(500).json({ message: error});
    //     }
    //   };


    async getProviderBookingsController(req: Req, res: Res) {
      const { providerId } = req.params;
      const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
      const limit = parseInt(req.query.limit as string, 10) || 10; // Default to 10 items per page
      const skip = (page - 1) * limit;
    
      try {
        if (!providerId) {
          return res.status(400).json({ error: "Provider ID is required" });
        }
    
        const isValidObjectId = mongoose.Types.ObjectId.isValid(providerId);
        if (!isValidObjectId) {
          return res.status(400).json({ error: "Invalid Provider ID format" });
        }
    
        const { bookings, total } = await this.igetbookingbyproviderIdUsecaseInterface.getProviderBookings(providerId, skip, limit);
    
        return res.status(200).json({
          bookings,
          total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        });
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    }
    

    
      async getBookingStatus(req:Req, res:Res) {
        const { userId, serviceId } = req.params;
    
        try {
          const bookingStatus = await this.ifetchReviewdateUsecaseinterface.FetchBookingStatus(userId, serviceId);
          res.status(200).json({ bookingStatus});
        } catch (error) {
          res.status(404).json({ message: error});
        }
      }


}

