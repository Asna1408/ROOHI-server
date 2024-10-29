import mongoose, { Types } from "mongoose";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { UserCreateBookingUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserCreateBookingUsecaseInterface";
import { BookingType } from "../../entities/types/user/BookingType";
import { ServiceModel } from "../../frameworks/database/models/user/ServicesModel";

export class UserCreateBookingUseCase implements UserCreateBookingUsecaseInterface {
    constructor(private ibookingrepository: IBookingRepository,
    ) {}

   
    async CreateBook(
        serviceId: mongoose.Types.ObjectId | string,
        userId: mongoose.Types.ObjectId ,
        selectedDate: Date,
        paymentStatus: string,
        sessionId:string,
        paymentIntentId: string

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


        const providerId = service.provider_id;
        const bookingData: BookingType = {
            service_id: serviceObjectId,
            user_id: userId,
            provider_id: providerId,
            booking_date: selectedDate,
            sessionId,
            paymentIntentId,
            status: "confirmed",
            created_at: new Date(),
            updated_at: new Date(),
        };

        return await this.ibookingrepository.createBooking(bookingData);
    }}