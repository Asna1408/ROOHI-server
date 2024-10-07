import mongoose from "mongoose";

export interface UserDeletePostUsecaseInterface{
      deletePost(postId: mongoose.Types.ObjectId): Promise<any>
}