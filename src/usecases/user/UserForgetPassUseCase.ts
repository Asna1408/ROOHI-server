
import { IUserForgetPassUsecase } from "../../entities/useCaseInterfaces/user/IUserForgetPassUsecase";
import { SendEmailOtp } from "../../frameworks/services/nodemailer/nodemailer";
import { IUserRepository } from "../../interface adapter/respository/user/IUserRepository";
import bcrypt from 'bcrypt'



export class UserForgetPassUseCase implements IUserForgetPassUsecase{
   constructor(private iuserrepository:IUserRepository){}
;
   

   async RequestPasswordReset(email: string,password:string): Promise<boolean> {
   try{
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await this.iuserrepository.UpdatePassword(email,hashedpassword);
    return user;   
}catch(error){
    console.error('Error resetting password : ',error);
    return false;
}
    
  
}

async SendVerificationEmail(email: string, link: string): Promise<boolean> {
   
  try{
  const user: any = await this.iuserrepository.FindByEmail(email);

    if(!user){
      return false
    }

    const emailSend = await SendEmailOtp(user?.name, user?.email, link);

    if(emailSend.success){
      return true;
    }else{
      return false
    }

  }catch(error){
throw new Error("Error occured while sending mail")
  }

    
  }


}
