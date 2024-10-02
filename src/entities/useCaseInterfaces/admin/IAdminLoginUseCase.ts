import { AdminType } from "../../types/admin/AdminType";


export interface IAdminLoginUseCase{
   AdminLogin(email: string, Password: string): Promise<AdminType | string>
}