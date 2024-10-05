import mongoose from "mongoose";

export type ServiceType =  {
    service_name: string;
    description: string;
    price: number;
    provider_id: mongoose.Types.ObjectId; // References User model
    service_type: mongoose.Types.ObjectId; // References ServiceCategory model
    availability: Date[];
    image?: string;
    created_at: Date;
    updated_at: Date;
  }