
import {Req,Res,Next} from "../../Types/servertype"

export interface Tokenservice{
  verifyToken(req:Req,res:Res,next:Next):Promise<Next | void >
  createJwtToken(req:Req,res:Res,next:Next):Promise<Next | void >
  refreshToken(req: Req, res: Res, next: Next): Promise<void | Next>
  removeToken(req:Req,res:Res,next:Next):Promise<Next | void >
}

export default Tokenservice
