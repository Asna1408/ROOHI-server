
import {IGoogleAuth} from "../../../entities/useCaseInterfaces/user/IGoogleAuthUseCase"
import { Req, Res } from "../../../frameworks/Types/servertype";

export class GoogleOAthController {
  constructor(private googleauthusecase: IGoogleAuth) {}
  async GoogleoauthController(req: Req, res: Res) {
    try {
      const data= await this.googleauthusecase.GoogleAuthLogin(req.body);
      console.log(data)
      console.log("👍👍👍👍👍👍👍❤️dataaaaaaaaaaaaaaaaaa");

      if (data) {
        const token: string = req.body.token;// Assuming token is part of the response
        res.cookie("access_token", token, { httpOnly: true }).json(data);
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Authentication failed." });
    }
  }
}