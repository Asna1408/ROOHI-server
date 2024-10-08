import mongoose from "mongoose";

export interface UserCancelBookingUseCaseInterface{

    CancelBook(bookingId: string, serviceId: string, canceledDate: Date):Promise<any>
}