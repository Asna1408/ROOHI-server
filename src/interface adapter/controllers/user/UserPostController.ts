import { UserAddPostUsecaseInterface } from "../../../entities/useCaseInterfaces/user/UserAddPostUsecaseInterface";
import { Res, Req } from "../../../frameworks/Types/servertype";

export class UserPostController {
    constructor(private iuserpostaddusecase: UserAddPostUsecaseInterface) {}

    async createService(req: Req, res: Res): Promise<void> {
        try {
            // Log request body for debugging
            console.log("Request body:", req.body);

            // Extract data from request body
            const { service_name, description, price, provider_id, service_type, availability } = req.body;

            if (!service_name || !description || !price || !provider_id || !service_type || !availability) {
                 res.status(400).json({ message: "Missing required fields" });
            }

            const serviceData = req.body;

            // Call use case to create service
            const newService = await this.iuserpostaddusecase.createService(serviceData);
             res.status(201).json({ message: "Service created successfully", service: newService });
        } catch (error) {
            console.error("Error adding service:", error);
            res.status(500).json({ message: "Internal server error", error: error });
        }
    }
}
