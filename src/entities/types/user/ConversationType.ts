import { ObjectId } from "mongoose";

export type ConversationType = {
    _id?: string | ObjectId;
    members: string[]; 
    createdAt?: Date;
    updatedAt?: Date;
  }