import { IBlockUserUseCase } from "../../entities/useCaseInterfaces/admin/IBlockUserUseCase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class BlockUserUseCase implements IBlockUserUseCase{
    constructor(private iadminrepository: IAdminRepository) {}
  
    async BlockUsers(userId: string): Promise<any> {
      return await this.iadminrepository.BlockUser(userId);
    }
  }