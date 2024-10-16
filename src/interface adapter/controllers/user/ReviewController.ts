import { Types } from "mongoose";
import { ReviewType } from "../../../entities/types/user/ReviewType";
import { CreateReviewUsecaseInterface } from "../../../entities/useCaseInterfaces/user/CreateReviewUsecaseInterface";
import { GetReviewByserviceIdUsecaseInterface } from "../../../entities/useCaseInterfaces/user/GetReviewByserviceIdUsecaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";

export class ReviewController{
    constructor(private icreateReviewUsecaseinterface: CreateReviewUsecaseInterface,
                private igetreviewByusecaseinterface: GetReviewByserviceIdUsecaseInterface
    ){}

async createReview(req: Req, res: Res):Promise<ReviewType |any> {
   
    const { service_id, rating, review } = req.body;
    const userId = req.body.user_id
   
    try {
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const newReview = await this.icreateReviewUsecaseinterface.createReview(userId, service_id, rating, review);
      return res.status(201).json(newReview);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create review' });
    }
  }


  async getReviewsByService(req: Req, res: Res) {
    try {
      const { serviceId } = req.params;
      const reviews = await this.igetreviewByusecaseinterface.getReviewsByService(new Types.ObjectId(serviceId));
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error });
    }
  }

}