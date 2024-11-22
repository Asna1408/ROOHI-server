import { UserType } from "../../types/user/UserType";

export interface  GetUserCountUsecaseInterface{
     getUserCount():Promise<UserType>
}