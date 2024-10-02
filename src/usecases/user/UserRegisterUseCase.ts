import { UserType } from "../../entities/types/user/UserType";
import { IUserRegisterUseCase } from "../../entities/useCaseInterfaces/user/IUserRegisterUseCase";
import { SendEmailOtp } from "../../frameworks/services/nodemailer/nodemailer";
import { IUserRepository } from "../../interface adapter/respository/user/IUserRepository";
import otpGenerator from 'otp-generator';

export class UserRegisterUseCase implements IUserRegisterUseCase {
  constructor(private iuserrepository: IUserRepository) {}

  async UserRegister(user: UserType): Promise<UserType | string> {
    try {
      const existingUser = await this.iuserrepository.FindByEmail(user.email);
      const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: false,
      });

      // If user exists and is verified, return error message
      if (existingUser) {
        if (existingUser.verified) {
          return "User already exists";
        } else {
          // If user is not verified, delete the existing user
          const isDeleted = await this.iuserrepository.FindByEmailAndDelete(existingUser.email);

          if (!isDeleted) {
            return "Error deleting existing unverified user";
          }
        }
      }

      // Register the new user or re-register the unverified one
      const userData = {
        otp: OTP,
        ...user,
      };

      console.log(userData);

      const savedData = await this.iuserrepository.RegisterUser(userData);

      if (savedData) {
        const sendEmail = await SendEmailOtp(user.name, user.email, OTP);

        if (sendEmail) {
          console.log("Email sent successfully");
          return savedData;
        } else {
          return "Error sending OTP email";
        }  
      } else {
        return "Error saving data to the database";
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      return "An error occurred";
    }
  }
}
