export interface IUserVerifyOtpUseCase{
  VerifyOtp(email: string, otp: string): Promise<boolean>;
}

