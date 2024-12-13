
import {IGoogleAuth} from "../../../entities/useCaseInterfaces/user/IGoogleAuthUseCase"
import { Req, Res } from "../../../frameworks/Types/servertype";

export class GoogleOAthController {
  constructor(private googleauthusecase: IGoogleAuth) {}
 
  async GoogleoauthController(req: Req, res: Res) {
    try {
        const data = await this.googleauthusecase.GoogleAuthLogin(req.body);
        
        if (data) {
            const token: string = req.body.token;
            const refreshToken: string = req.body.refreshToken;

            // Set both access token and refresh token as cookies
            res.cookie('access_token', token, { httpOnly: false, maxAge: 60 * 60 * 1000 }); // 1 hour
            res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days

            res.json(data);
        } else {
            res.status(401).json({ message: "Invalid credentials." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Authentication failed." });
    }
}
}