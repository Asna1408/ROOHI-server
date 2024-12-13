import { UserType } from "../../entities/types/user/UserType";
import { IUserLoginUseCase } from "../../entities/useCaseInterfaces/user/IUserLoginUseCase";
import { IUserRepository } from "../../interface adapter/respository/user/IUserRepository";
import bcrypt from "bcrypt";



export class UserLoginUseCase implements IUserLoginUseCase {
   constructor(private iuserrepository: IUserRepository) { }

   async UserLogin(email: string, password: string): Promise<UserType | string> {
      
      try {
      const data = await this.iuserrepository.FindByEmail(email);
      //  console.log(data)
      if (data) {

         if(data.isBlocked){
            return "Your Account is Blocked"
         }

         if (!data.verified) {
            return "Account not verified. Please verify your account before logging in.";
          }

         const isPasswordValid = await bcrypt.compare(password, data.password);
         if (isPasswordValid) {
            return data;
         } else {
            return "Invalid credential"
         }
      } else {
         return "Invalid credential"
      }
   } catch (error) {
         console.error("Error during login:", error);
         return "An error occurred during login. Please try again later.";
      }
   }
}