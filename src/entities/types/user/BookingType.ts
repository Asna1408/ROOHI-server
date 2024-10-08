import mongoose from "mongoose";

export type BookingType = {
    _id?: mongoose.Types.ObjectId;      
    service_id: mongoose.Types.ObjectId; 
    user_id: mongoose.Types.ObjectId;     
    booking_date: Date;  
    paymentIntentId?: string;
    status: 'confirmed' | 'pending' | 'canceled'; 
    created_at?: Date;                     
    updated_at?: Date;                   
};