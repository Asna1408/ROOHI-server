export interface IUserResendOtpUseCase{
    ResendOtp(email: string): Promise<any>;
  }