import { UserType } from "../../entities/types/user/UserType";
import {IGoogleAuth} from "../../entities/useCaseInterfaces/user/IGoogleAuthUseCase";
import { IUserRepository } from "../../interface adapter/respository/user/IUserRepository";
import crypto from "crypto";
import bcrypt from "bcrypt"


export class GoogleAuthUseCase implements IGoogleAuth{
    constructor(private UserRepository: IUserRepository){}
    async GoogleAuthLogin(user: UserType): Promise<string | UserType | null | undefined | any> {
      const existingUser: any = await this.UserRepository.FindByEmail(user.email);

      if (existingUser) {
        return {
                existingUser ,
          alreadyRegistered: true,
        };
      } else {
        // Generate a random password
      
        const plainPassword = crypto.randomBytes(8).toString("hex");
        
        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  
        // Assign the hashed password to the user object
        user.password = hashedPassword;
  
        const newUser = await this.UserRepository.GoogleOAuth(user);
        return newUser;
      }
    }
}