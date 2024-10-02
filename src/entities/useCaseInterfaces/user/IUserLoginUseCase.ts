import { UserType } from "../../types/user/UserType";

export interface IUserLoginUseCase{
   UserLogin(email: string, password: string): Promise<UserType | string>
}