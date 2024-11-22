import mongoose from "mongoose";

export type BookingType = {
    _id?: mongoose.Types.ObjectId;      
    service_id: mongoose.Types.ObjectId; 
    user_id: mongoose.Types.ObjectId; 
    provider_id?:mongoose.Types.ObjectId | null;    
    booking_date: Date;  
    sessionId?:string;
    paymentIntentId?: string;
    amount:number;
    status: 'confirmed' | 'pending' | 'canceled' | 'completed'; 
    created_at?: Date;                     
    updated_at?: Date;                   
};