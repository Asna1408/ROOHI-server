import mongoose from "mongoose";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import { UserDeletePostUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserDeletePostUsecaseInterface";

export class UserDeletePostUseCase implements UserDeletePostUsecaseInterface {
    constructor(private ipostrepository: IPostRepository) {}

    async deletePost(postId: mongoose.Types.ObjectId): Promise<any> {
        return await this.ipostrepository.deletePost(postId);
    }

}