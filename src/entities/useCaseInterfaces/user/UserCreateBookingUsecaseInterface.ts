import mongoose from "mongoose";
import { BookingType } from "../../types/user/BookingType";

export interface UserCreateBookingUsecaseInterface {
    CreateBook(
        serviceId: mongoose.Types.ObjectId,
        userId: mongoose.Types.ObjectId,
        selectedDate: Date,
        paymentStatus: string,
        sessionId:string,
        paymentIntentId: string
    ): Promise<BookingType>;
}
