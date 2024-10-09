import mongoose from "mongoose";
import { UserCancelBookingUseCaseInterface } from "../../../entities/useCaseInterfaces/user/UserCancelBookingUseCaseInterface";
import { UserCreateBookingUsecaseInterface } from "../../../entities/useCaseInterfaces/user/UserCreateBookingUsecaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";
import Stripe from 'stripe';
import { GetBookedDatesUseCaseInterface } from "../../../entities/useCaseInterfaces/user/GetBookedDatesUseCaseInterface";
const stripe = new Stripe('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');
  

export class BookingController {
    constructor(private icreatebookingUsecaseinterface: UserCreateBookingUsecaseInterface,
        private igetdatesusecaseinterface: GetBookedDatesUseCaseInterface
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
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`, // Redirect after payment success
                cancel_url: `${req.headers.origin}/cancel`, 
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


    async getAvailability(req:Req, res:Res) {
        const { serviceId } = req.params;
    
        try {
          const availabilityData = await this.igetdatesusecaseinterface.getbookeddates(serviceId);
          res.json(availabilityData);
        } catch (error) {
          console.error('Error fetching availability:', error);
          res.status(500).json({ message: error || 'Server error' });
        }
      }
    
}

