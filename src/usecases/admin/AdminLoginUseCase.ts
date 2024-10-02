import { AdminType } from "../../entities/types/admin/AdminType";
import { IAdminLoginUseCase } from "../../entities/useCaseInterfaces/admin/IAdminLoginUseCase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";


export class AdminLoginUseCase implements IAdminLoginUseCase{
    constructor(private adminRepository: IAdminRepository){}
    
    async AdminLogin(email:string,password:string): Promise<AdminType | string>{
        const emailExist:any = await this.adminRepository.LoginAdmin(email);
        if(emailExist && emailExist?.password === password){
            return emailExist
        }else{
            return "Invalid";
        }
    }
}