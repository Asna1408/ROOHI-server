import { UserProfileEditUsecaseInterface } from "../../../entities/useCaseInterfaces/user/UserProfileEditUsecaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";

export class UserProfileController{
    constructor(private iusereditprofileusecase: UserProfileEditUsecaseInterface) {}

    async editProfile(req: Req, res: Res) {
        const userId = req.params.userId; 
        const updateData = req.body;

        try {
            const updatedUser = await this.iusereditprofileusecase.EditProfile(userId, updateData);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: error});
        }
    }

    async getUserById(req: Req, res: Res) {
        const userId = req.params.userId; 

        try {
            const user = await this.iusereditprofileusecase.getUserById(userId);
           
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json( user );
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}