import { IUserRegisterUseCase } from "../../../entities/useCaseInterfaces/user/IUserRegisterUseCase";
import { Request, Response } from "express";

export class UserRegisterController {
    constructor(private iuserregisterusecase: IUserRegisterUseCase) {}

    async UserRegisterControl(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, phone } = req.body.formData;
            const user = {
                name: name,
                email: email,
                password: password,
                phone: phone
            };

            console.log(req.body)
            const result = await this.iuserregisterusecase.UserRegister(user);
            console.log("signup controller😒😒😒😒😒")
            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    }
}
