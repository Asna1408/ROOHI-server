import { IUserVerifyOtpUseCase } from "../../../entities/useCaseInterfaces/user/IUserVerifyOtpUseCase";
import { Req, Res } from "../../../frameworks/Types/servertype";

export class UserVerifyOtpController{
 constructor(private iuserverifyotpusecase: IUserVerifyOtpUseCase){};

 async UserVerifyOtpControl(req: Req, res: Res): Promise<void>{
    try {
        const data = await this.iuserverifyotpusecase.VerifyOtp(req.body.email, req.body.otp);
          console.log(data);
        res.json(data);
    } catch (error) {
        console.log(error)
    }
 }

}