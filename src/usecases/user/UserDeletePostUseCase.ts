import mongoose from "mongoose";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import { UserDeletePostUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserDeletePostUsecaseInterface";

export class UserDeletePostUseCase implements UserDeletePostUsecaseInterface {
    constructor(private ipostrepository: IPostRepository) {}

    async deletePost(postId: mongoose.Types.ObjectId): Promise<any> {
    
        try{
        
        return await this.ipostrepository.deletePost(postId);
        }catch(error){
            throw new Error("error occured when deleting the post")
        }
    
    }

}