import { UserType } from "../../types/user/UserType";

export  interface IGetAllUserUseCase{
    // GetAllUsers():Promise<UserType[]>
    GetAllUsers(skip: number, limit: number): Promise<{ users: UserType[]; total: number }>
    
    
}