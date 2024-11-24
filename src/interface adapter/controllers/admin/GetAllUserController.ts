import { GetUserCountUsecaseInterface } from "../../../entities/useCaseInterfaces/admin/GetUserCountUsecaseInterface";
import { Req,Res } from "../../../frameworks/Types/servertype";
import { BlockUserUseCase } from "../../../usecases/admin/BlockUserUseCase.ts";
import { GetAllUserUseCase } from "../../../usecases/admin/GetAllUserUseCase";
import { UnblockUserUseCase } from "../../../usecases/admin/UnBlockUserUseCase";

export class GetAllUserController{
    constructor(private getalluserusecase:GetAllUserUseCase,private blockUserUseCase: BlockUserUseCase, private unblockUserUseCase: UnblockUserUseCase,private igetusercountusecase : GetUserCountUsecaseInterface){}
    
//  async GetAllUserControl (req:Req,res:Res):Promise<void>{
//     try{
//         const data = await this.getalluserusecase.GetAllUsers()
//         res.status(200).json(data)
//     }catch(error){
//         console.log(error)
//     }
//  }

async GetAllUserControl(req: Req, res: Res): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page

    const skip = (page - 1) * limit;

    const { users, total } = await this.getalluserusecase.GetAllUsers(skip, limit);

    res.status(200).json({ users, total, currentPage: page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
}


 async BlockUserControl(req: Req, res: Res): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await this.blockUserUseCase.BlockUsers(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error blocking user" });
    }
  }

  async UnblockUserControl(req: Req, res: Res): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await this.unblockUserUseCase.UnBlockUsers(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error unblocking user" });
    }
  }

  async getUserCount(req:Req, res:Res) {
    try {
      const count = await this.igetusercountusecase.getUserCount();
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error fetching user count:", error);
      res.status(500).json({ message: 'Error fetching user count' });
    }
  };

}