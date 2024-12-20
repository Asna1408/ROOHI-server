import { Model } from "mongoose";
import { UserType } from "../../../entities/types/user/UserType";
import { BannerType } from "../../../entities/types/admin/BannerType";

export interface IUserRepository{
    getPaginatedData<T extends Document>(
        model: Model<T>,
        page: number,
        limit: number,
        populateFields?: string[]
      ): Promise<{ totalRecords: number; records: T[] }>;
    RegisterUser(user: UserType): Promise<UserType>; 
    FindByEmail(email: string): Promise<UserType | null>
    GoogleOAuth(user:UserType):Promise<UserType | null>
    FindByEmailAndDelete(email: string): Promise<boolean>
    UpdateUserOtp(email: string, otp: string): Promise<any>;
    UpdateVerifiedStatus(email: string, status: boolean): Promise<any>;
    UpdateUser(email: string, updateData: any): Promise<any>;  
    UpdatePassword(userId:string,hashedPassword:string):Promise<any>;
    getUserById(userId: string): Promise<UserType | any>
    updateProfile(userId: string, updateData: Partial<UserType>): Promise<UserType | any>
    // saveResetToken(userId: string, token: string, expiration: Date): Promise<void>;
    getActiveBanners():Promise<BannerType | any> 
}