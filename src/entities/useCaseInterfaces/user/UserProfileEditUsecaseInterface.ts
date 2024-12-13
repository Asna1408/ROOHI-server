import { UserType } from "../../types/user/UserType";

export interface UserProfileEditUsecaseInterface{
    getUserById(userId: string): Promise<UserType | null>
    EditProfile(userId: string, updateData: Partial<UserType>): Promise<UserType | null>
}