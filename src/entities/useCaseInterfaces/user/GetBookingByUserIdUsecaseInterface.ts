import mongoose from "mongoose";

export interface GetBookingByUserIdUsecaseInterface{
    getbookByUserId(userId: string): Promise<any[]>
}