import { UserType } from "../../entities/types/user/UserType";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";
import { IGetAllUserUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllUserUseCase";

export class GetAllUserUseCase implements IGetAllUserUseCase{

    constructor(private iadminrepository:IAdminRepository){}

    async GetAllUsers():Promise<UserType[]>{
    return await this.iadminrepository.GetAllUsers() 
    }

}

