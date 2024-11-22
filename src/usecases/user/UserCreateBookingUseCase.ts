// import mongoose, { Types } from "mongoose";
// import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
// import { UserCreateBookingUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserCreateBookingUsecaseInterface";
// import { BookingType } from "../../entities/types/user/BookingType";
// import { ServiceModel } from "../../frameworks/database/models/user/ServicesModel";

// export class UserCreateBookingUseCase implements UserCreateBookingUsecaseInterface {
//     constructor(private ibookingrepository: IBookingRepository,
//     ) {}

   
//     async CreateBook(
//         serviceId: mongoose.Types.ObjectId | string,
//         userId: mongoose.Types.ObjectId ,
//         selectedDate: Date,
//         paymentStatus: string,
//         sessionId:string,
//         paymentIntentId: string,
//         amount:number

//     ): Promise<BookingType> {
//         const serviceObjectId = typeof serviceId === 'string' ? new mongoose.Types.ObjectId(serviceId) : serviceId;
//         const service = await ServiceModel.findById(serviceObjectId).exec();

//         if (!service) {
//             throw new Error("Service not found");
//         }

//         const isDateAvailable = service.availability.some((availableDate: any) => {
//             const availableDateObj = availableDate instanceof Date ? availableDate : new Date(availableDate);
//             return availableDateObj.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
//         });

//         if (!isDateAvailable) {
//             throw new Error("Selected date is not available for booking");
//         }

//         const updateResult = await ServiceModel.updateOne(
//             { _id: serviceObjectId },
//             { $pull: { availability: selectedDate } }
//         );

//         if (updateResult.modifiedCount === 0) {
//             throw new Error("Failed to update service availability");
//         }


//         const providerId = service.provider_id;

//         const bookingData: BookingType = {
//             service_id: serviceObjectId,
//             user_id: userId,
//             provider_id: providerId,
//             booking_date: selectedDate,
//             amount,
//             sessionId,
//             paymentIntentId,
//             status: "confirmed",
//             created_at: new Date(),
//             updated_at: new Date(),
//         };

//         return await this.ibookingrepository.createBooking(bookingData);
//     }}




import mongoose, { Types } from "mongoose";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { UserCreateBookingUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserCreateBookingUsecaseInterface";
import { BookingType } from "../../entities/types/user/BookingType";
import { ServiceModel } from "../../frameworks/database/models/user/ServicesModel";
import Stripe from "stripe";
import { UserModel } from "../../frameworks/database/models/user/userModel";
const stripe = new Stripe('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');



export class UserCreateBookingUseCase implements UserCreateBookingUsecaseInterface {
    constructor(private ibookingrepository: IBookingRepository,
    ) {}


    async createConnectedAccount(email: string): Promise<string> {
        try {
            // Create a new connected account on Stripe
            const account = await stripe.accounts.create({
                type: "express", // "express" is commonly used for managed connected accounts
                email: email,
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
            });
            return account.id;
        } catch (error) {
            console.error("Error creating Stripe connected account:", error);
            throw new Error("Failed to create connected account.");
        }
    }


   
    async CreateBook(
        serviceId: mongoose.Types.ObjectId | string,
        userId: mongoose.Types.ObjectId ,
        selectedDate: Date,
        paymentStatus: string,
        sessionId:string,
        paymentIntentId: string,
        amount:number

    ): Promise<BookingType> {
        const serviceObjectId = typeof serviceId === 'string' ? new mongoose.Types.ObjectId(serviceId) : serviceId;
        const service = await ServiceModel.findById(serviceObjectId).exec();

        if (!service) {
            throw new Error("Service not found");
        }

        const isDateAvailable = service.availability.some((availableDate: any) => {
            const availableDateObj = availableDate instanceof Date ? availableDate : new Date(availableDate);
            return availableDateObj.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
        });

        if (!isDateAvailable) {
            throw new Error("Selected date is not available for booking");
        }

        const updateResult = await ServiceModel.updateOne(
            { _id: serviceObjectId },
            { $pull: { availability: selectedDate } }
        );

        if (updateResult.modifiedCount === 0) {
            throw new Error("Failed to update service availability");
        }


       const provider = await UserModel.findById(service.provider_id);
        if (!provider) {
            throw new Error("Provider not found");
        }

        // Check if provider has a Stripe connected account
        if (!provider.stripeAccountId) {
            // Create a connected account for the provider on their first booking
            const stripeAccountId = await this.createConnectedAccount(provider.email);
            
            // Update provider with their new Stripe account ID
            provider.stripeAccountId = stripeAccountId;
            await provider.save();
        }


        const bookingData: BookingType = {
            service_id: serviceObjectId,
            user_id: userId,
            provider_id: provider._id,
            booking_date: selectedDate,
            amount,
            sessionId,
            paymentIntentId,
            status: "confirmed",
            created_at: new Date(),
            updated_at: new Date(),
        };

        return await this.ibookingrepository.createBooking(bookingData);
    }}