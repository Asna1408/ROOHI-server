import { UserType } from "../../types/user/UserType";


export interface IUserRegisterUseCase{
    UserRegister(user:UserType):Promise<UserType | string>;
}