import { IUserVerifyOtpUseCase } from "../../entities/useCaseInterfaces/user/IUserVerifyOtpUseCase";
import { IUserRepository } from "../../interface adapter/respository/user/IUserRepository";

export class UserVerifyOtpUseCase implements IUserVerifyOtpUseCase{
   constructor(private iuserrepository: IUserRepository){};

   async VerifyOtp(email: string, otp: string): Promise<boolean> {
     
      try{
      const data: any = await this.iuserrepository.FindByEmail(email);
      
    if(data){
      console.log(data)
      console.log(data?.otp , " ", otp)
        if(data?.otp === otp){
         await this.iuserrepository.UpdateVerifiedStatus(email, true);
            return true
         }else{
            return false;
         }
    }else{
        return false
    }
   }catch (error) {
      console.error("Error verifying OTP:", error);
      return false; 
    }
}

}