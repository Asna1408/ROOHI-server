import { IUserRepository } from "../../interface adapter/respository/user/IUserRepository";
import { IUserResendOtpUseCase } from "../../entities/useCaseInterfaces/user/IUserResendOtpUseCase";
import otpGenerator from 'otp-generator';
import { SendEmailOtp } from "../../frameworks/services/nodemailer/nodemailer";

export class UserResendOtpUseCase implements IUserResendOtpUseCase {
  constructor(private iuserrepository: IUserRepository) {}

  async ResendOtp(email: string): Promise<string> {
    try {
      const user = await this.iuserrepository.FindByEmail(email);

      // If user does not exist or is already verified, return appropriate message
      if (!user) {
        console.error(`User not found for email: ${email}`);
        return "User not found";
      }

      if (user.verified) {
        console.log(`User already verified for email: ${email}`);
        return "User already verified";
      }

      // Generate a new OTP
      const newOtp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true, 
      });

      // Update the user with the new OTP
      const updatedUser = await this.iuserrepository.UpdateUserOtp(user.email, newOtp);

      if (!updatedUser) {
        console.error(`Error updating OTP for user: ${email}`);
        return "Error updating OTP for user";
      }

      // Send the new OTP via email
      const sendEmail = await SendEmailOtp(user.name, user.email, newOtp);

      if (sendEmail) {
        console.log(`OTP resent successfully to: ${email}`);
        return "OTP resent successfully";
      } else {
        console.error(`Error sending OTP email to: ${email}`);
        return "Error sending OTP email";
      }

    } catch (error) {
      console.error("An error occurred while resending OTP:", error);
      return "An unknown error occurred";
    }
  }
}
