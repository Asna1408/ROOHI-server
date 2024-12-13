import mongoose from "mongoose";
import { UserAddPostUsecaseInterface } from "../../../entities/useCaseInterfaces/user/UserAddPostUsecaseInterface";
import { Res, Req } from "../../../frameworks/Types/servertype";
import { UserGetAllPostUseCaseInterface } from "../../../entities/useCaseInterfaces/user/UserGetAllPostInterface";
import { UserDeletePostUsecaseInterface } from "../../../entities/useCaseInterfaces/user/UserDeletePostUsecaseInterface";
import { UserEditPostUsecaseInterface } from "../../../entities/useCaseInterfaces/user/UserEditPostUseCaseInterface";
import { UserGetPostByIdUseCaseInterface } from "../../../entities/useCaseInterfaces/user/UserGetPostByIdUseCaseInterface";
import { UserGetAllPostInShopUseCaseInterface } from "../../../entities/useCaseInterfaces/user/UserGetAllPostInShopUseCaseInterface";
import { UserGetSingleServiceUseCaseInterface } from "../../../entities/useCaseInterfaces/user/UserGetSingleServiceUseCaseInterface";
import { GetServiceAvailabiltyUsecaseInterface } from "../../../entities/useCaseInterfaces/user/GetServiceAvailabiltyUsecaseInterface";


export class UserPostController {
    constructor(private iuserpostaddusecase: UserAddPostUsecaseInterface,
        private usergetpostusecaseinterface:UserGetAllPostUseCaseInterface,
        private userdeletepostusercaseinterface:UserDeletePostUsecaseInterface,
        private usergetpostbyidusecaseinterface:UserGetPostByIdUseCaseInterface,
        private usereditpostusecaseinterface:UserEditPostUsecaseInterface,
        private userfetchallpostusecaseinterface:UserGetAllPostInShopUseCaseInterface,
        private usergetsingleserviceinterface:UserGetSingleServiceUseCaseInterface,
        private getserviceavailabilityusecaseInterfcae:GetServiceAvailabiltyUsecaseInterface,
    ) {}

    async createService(req: Req, res: Res): Promise<any> {
        try {
            console.log("Request body:", req.body);

            const { service_name, description, price, provider_id, service_type, availability } = req.body;

            if (!service_name || !description || !price || !provider_id || !service_type || !availability) {
                return res.status(400).json({ message: "Missing required fields" }); 
            }

            const serviceData = req.body;
            const newService = await this.iuserpostaddusecase.createService(serviceData);
            return res.status(201).json({ message: "Service created successfully", service: newService }); 
        } catch (error) {
            console.error("Error adding service:", error);
            return res.status(500).json({ message: "Internal server error", error: error }); 
        }
    }


    async GetAllPost(req: Req, res: Res) {
      try {
        console.log("Full URL:", req.originalUrl);
        console.log("Provider ID from Params:", req.params.providerId);
    
        const providerId = new mongoose.Types.ObjectId(req.params.providerId);
        console.log("Converted Provider ID:", providerId);
    
        const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
        const limit = parseInt(req.query.limit as string, 10) || 10; // Default to 10 items per page
        const skip = (page - 1) * limit;
    
        const { services, total } = await this.usergetpostusecaseinterface.GetAllPost(providerId, skip, limit);
    
        console.log("Fetched Services:", services);
    
        res.status(200).json({
          services,
          total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        });
      } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: error });
      }
    }
    


      async getPost(req: Req, res: Res) {
        const { postId } = req.params;
    
        try {
          const post = await this.usergetpostbyidusecaseinterface.getPostById(postId);
          if (!post) {
            return res.status(404).json({ message: 'Post not found' });
          }
          return res.status(200).json(post);
        } catch (error) {
          return res.status(500).json({ message: 'Server error', error:error});
        }
      }
      

      async editPost(req: Req, res: Res): Promise<any> {
        try {
            const postId = new mongoose.Types.ObjectId(req.params.postId); 
            const updatedData = req.body; 

            const updatedPost = await this.usereditpostusecaseinterface.updatePost(postId, updatedData);
            
            if (!updatedPost) {
                return res.status(404).json({ message: "Post not found" });
            }

            return res.status(200).json({ message: "Post updated successfully", updatedPost });
        } catch (error) {
            console.error("Error updating post:", error);
            return res.status(500).json({ message: "Internal server error", error });
        }
    }

   
    async deletePost(req: Req, res: Res): Promise<any> {
        try {
            const postId = new mongoose.Types.ObjectId(req.params.postId); 

            const deletedPost = await this.userdeletepostusercaseinterface.deletePost(postId);
            
            if (!deletedPost) {
                return res.status(404).json({ message: "Post not found" });
            }

            return res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            console.error("Error deleting post:", error);
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
      
    async getAllServices(req: Req, res: Res) :Promise<any>{
      try {
        const services = await this.userfetchallpostusecaseinterface.fetchAllServices();
        res.status(200).json(services);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    };


    //get single service
    async getsingleService(req: Req, res: Res) {
      const serviceId = new mongoose.Types.ObjectId(req.params.id); 

      try {
          const service = await this.usergetsingleserviceinterface.getsingleservice(serviceId);
          if (!service) {
              return res.status(404).json({ message: "Service not found" });
          }
          return res.json(service);
      } catch (error) {
          return res.status(500).json({ message: error });
      }
  }

  async getAvailability(req: Req, res: Res) {
    try {
        const { serviceId } = req.params; 
        const availability = await this.getserviceavailabilityusecaseInterfcae.getdates(serviceId);
        res.status(200).json(availability);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}
    
}
