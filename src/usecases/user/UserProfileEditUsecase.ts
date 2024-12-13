import { UserType } from "../../entities/types/user/UserType";
import { UserProfileEditUsecaseInterface } from "../../entities/useCaseInterfaces/user/UserProfileEditUsecaseInterface";
import { IUserRepository } from "../../interface adapter/respository/user/IUserRepository";



export class UserProfileEditUsecase implements UserProfileEditUsecaseInterface {
   constructor(private iuserrepository: IUserRepository) { }
   
   async getUserById(userId: string): Promise<UserType | null> {
    try {
        const user = await this.iuserrepository.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw new Error(`Error in GetUserByIdUseCase: ${error}`);
    }
}

   async EditProfile(userId: string, updateData: Partial<UserType>): Promise<UserType | null> {

    try{
    const updatedUser = await this.iuserrepository.updateProfile(userId, updateData);
    return updatedUser;
    }catch(error){
        throw new Error(`Error in Updating the UserDetail: ${error}`);
    }
}

}