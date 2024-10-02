

export interface IUserForgetPassUsecase{
    RequestPasswordReset(email: string, password: string): Promise< boolean>;

    SendVerificationEmail(email: string, link: string): Promise<boolean> 
}