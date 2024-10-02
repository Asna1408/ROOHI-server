import { UserType } from "../../types/user/UserType";

export interface IGoogleAuth{
    GoogleAuthLogin(user:UserType):Promise<UserType |null|string|undefined>;
}