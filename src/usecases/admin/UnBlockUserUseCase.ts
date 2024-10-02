import { IUnBlockUserUseCase } from "../../entities/useCaseInterfaces/admin/IUnBlockUserUseCase";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class UnblockUserUseCase implements IUnBlockUserUseCase {
  constructor(private iadminrepository: IAdminRepository) {}

  async UnBlockUsers(userId: string): Promise<any> {
    return await this.iadminrepository.UnblockUser(userId);
  }
}