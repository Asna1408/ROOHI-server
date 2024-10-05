import { UserType } from "../../../entities/types/user/UserType";

export interface IUserRepository{
    RegisterUser(user: UserType): Promise<UserType>; 
    FindByEmail(email: string): Promise<UserType | null>
    GoogleOAuth(user:UserType):Promise<UserType | null>
    FindByEmailAndDelete(email: string): Promise<boolean>
    UpdateUserOtp(email: string, otp: string): Promise<any>;
    UpdateVerifiedStatus(email: string, status: boolean): Promise<any>;
    UpdateUser(email: string, updateData: any): Promise<any>;  
    UpdatePassword(userId:string,hashedPassword:string):Promise<any>;
    EditProfile(updateData:any,_id:string):Promise<any>
    // saveResetToken(userId: string, token: string, expiration: Date): Promise<void>;
}