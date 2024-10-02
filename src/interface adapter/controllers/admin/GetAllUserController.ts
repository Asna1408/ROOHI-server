import { Req,Res } from "../../../frameworks/Types/servertype";
import { BlockUserUseCase } from "../../../usecases/admin/BlockUserUseCase.ts";
import { GetAllUserUseCase } from "../../../usecases/admin/GetAllUserUseCase";
import { UnblockUserUseCase } from "../../../usecases/admin/UnBlockUserUseCase";

export class GetAllUserController{
    constructor(private getalluserusecase:GetAllUserUseCase,private blockUserUseCase: BlockUserUseCase, private unblockUserUseCase: UnblockUserUseCase){}
    
 async GetAllUserControl (req:Req,res:Res):Promise<void>{
    try{
        const data = await this.getalluserusecase.GetAllUsers()
        res.status(200).json(data)
    }catch(error){
        console.log(error)
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

}