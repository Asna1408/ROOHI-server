import { UserType } from "../../types/user/UserType";

export  interface IGetAllUserUseCase{
    GetAllUsers():Promise<UserType[]>
    
    
}