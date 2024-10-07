import mongoose from "mongoose";

export interface UserGetPostByIdUseCaseInterface{
    getPostById(postId: string): Promise<any> 
}