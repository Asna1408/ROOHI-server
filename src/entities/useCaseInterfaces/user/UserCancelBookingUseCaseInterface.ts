import mongoose from "mongoose";

export interface UserCancelBookingUseCaseInterface{

    cancelBooking(bookingId: mongoose.Types.ObjectId): Promise<void> 
}