import { Request, Response } from "express";
import { IUserResendOtpUseCase } from "../../../entities/useCaseInterfaces/user/IUserResendOtpUseCase";

export class ResendOtpController {
  constructor(private iuserResendOtpUseCase: IUserResendOtpUseCase) {}

  // Controller method for handling resend OTP requests
  async resendOtp(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    console.log("Email received in request:", email);

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    try {
      // Call the use case to handle the resend OTP logic
      const result = await this.iuserResendOtpUseCase.ResendOtp(email);
      console.log(result)
      // Check the result and return the appropriate response
      if (result === "User not found") {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      if (result === "User already verified") {
        return res.status(400).json({ success: false, message: "User already verified." });
      }

      if (result === "OTP resent successfully") {
        return res.status(200).json({ success: true, message: "OTP resent successfully." });
      } else {
        return res.status(500).json({ success: false, message: result });
      }

    } catch (error) {
      console.error("Error in resend OTP controller:", error);
      return res.status(500).json({ success: false, message: "An error occurred while resending OTP." });
    }
  }
}
