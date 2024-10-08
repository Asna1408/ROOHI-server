import mongoose, { Types } from "mongoose";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { ObjectId } from "mongodb";
import { UserCreateBookingUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserCreateBookingUsecaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import { BookingType } from "../../entities/types/user/BookingType";

export class UserCreateBookingUseCase implements UserCreateBookingUsecaseInterface {
    constructor(private ibookingrepository: IBookingRepository,
    ) {}

   
    async CreateBook(
        serviceId: mongoose.Types.ObjectId,
        userId: mongoose.Types.ObjectId,
        selectedDate: Date,
        paymentStatus: string,
        paymentIntentId: string
    ): Promise<BookingType> {
        const bookingData: BookingType = {
            service_id: serviceId,
            user_id: userId,
            booking_date: selectedDate,
            paymentIntentId,
            status: "confirmed",
            created_at: new Date(),
            updated_at: new Date(),
        };

        return await this.ibookingrepository.createBooking(bookingData);
    }}