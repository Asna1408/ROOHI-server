import mongoose from "mongoose";

export type ReviewType = {
    user_id: mongoose.Schema.Types.ObjectId;
    service_id: mongoose.Schema.Types.ObjectId;
    rating: number;
    review: string;
    created_at?: Date;
    updated_at?: Date;
  }
  