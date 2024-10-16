import mongoose from "mongoose";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import { UserEditPostUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserEditPostUseCaseInterface";

export class UserEditPostUseCase implements UserEditPostUsecaseInterface {
    constructor(private ipostrepository: IPostRepository) {}

async updatePost(postId: mongoose.Types.ObjectId, updatedData: any): Promise<any> {
    return await this.ipostrepository.updatePost(postId, updatedData);
}

}