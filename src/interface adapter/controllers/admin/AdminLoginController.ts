
import { IAdminLoginUseCase } from "../../../entities/useCaseInterfaces/admin/IAdminLoginUseCase";
import { Req, Res } from "../../../frameworks/Types/servertype";



export class AdminLoginController{
    constructor(private iadminloginusecase : IAdminLoginUseCase){}
    async AdminLoginControl(req: Req, res: Res){
        try {
            const token = req.body.token;
            const refreshToken = req.body.refreshToken;

        // Set both access token and refresh token as cookies
        res.cookie("access_token", token, { httpOnly: false, maxAge: 60 * 60 * 1000 }); // 1 hour
        res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
        const data = await this.iadminloginusecase.AdminLogin(req.body.email, req.body.password);
            res.json(data);
        } catch (error) {
            res.status(404).json(error);
            console.log(error)
        }
    }
}