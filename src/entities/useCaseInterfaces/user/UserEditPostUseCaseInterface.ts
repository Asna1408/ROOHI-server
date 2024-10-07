import mongoose from "mongoose";


export interface UserEditPostUsecaseInterface{
    updatePost(postId: mongoose.Types.ObjectId, updatedData: any): Promise<any>
}