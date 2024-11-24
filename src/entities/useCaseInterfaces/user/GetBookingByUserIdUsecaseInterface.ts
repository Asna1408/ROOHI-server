import mongoose from "mongoose";

export interface GetBookingByUserIdUsecaseInterface{
    // getbookByUserId(userId: string): Promise<any[]>
    getbookByUserId(userId: string, skip: number, limit: number): Promise<{ bookings: any[]; total: number }>
}