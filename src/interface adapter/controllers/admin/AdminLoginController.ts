
import { IAdminLoginUseCase } from "../../../entities/useCaseInterfaces/admin/IAdminLoginUseCase";
import { Req, Res } from "../../../frameworks/Types/servertype";



export class AdminLoginController{
    constructor(private iadminloginusecase : IAdminLoginUseCase){}
    async AdminLoginControl(req: Req, res: Res){
        try {
            const data = await this.iadminloginusecase.AdminLogin(req.body.email, req.body.password);
           
            res.json(data);
        } catch (error) {
            res.status(404).json(error);
            console.log(error)
        }
    }
}