import React from 'react'
import { IUserForgetPassUsecase } from '../../../entities/useCaseInterfaces/user/IUserForgetPassUsecase';
import { Req, Res } from '../../../frameworks/Types/servertype';


export class UserForgetPassController {

    constructor(private iuserforgetpasswordusecase: IUserForgetPassUsecase){}

    async RequestResetPassword(req:Req,res:Res):Promise<void>{
        try{
            const { email, link } = req.body;

    const emailExists = await this.iuserforgetpasswordusecase.SendVerificationEmail(email, link);
    if (!emailExists) {
      res.status(400).json({ message: 'Email not found' });
      return;
    }

 
    res.status(200).json({ message: 'Password reset link sent to your email.' });

        }catch(error){
            console.log(error)
        }
    }

    async resetPassword(req: Req, res: Res): Promise<void> {
        try {
        const { email, password } = req.body;
        
    
        const result = await this.iuserforgetpasswordusecase.RequestPasswordReset(email, password);
    
        if (result) {
          res.status(200).json({ message: 'Password reset successful' });
        } else {
          res.status(400).json({ message: 'Error resetting password' });
        }
      }catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}
}
