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
            // Log request body for debugging
            console.log("Request body:", req.body);

            // Extract data from request body
            const { service_name, description, price, provider_id, service_type, availability } = req.body;

            // Validate required fields
            if (!service_name || !description || !price || !provider_id || !service_type || !availability) {
                return res.status(400).json({ message: "Missing required fields" }); // Return to avoid further execution
            }

            const serviceData = req.body;

            // Call use case to create service
            const newService = await this.iuserpostaddusecase.createService(serviceData);
            return res.status(201).json({ message: "Service created successfully", service: newService }); // Return after sending response
        } catch (error) {
            console.error("Error adding service:", error);
            return res.status(500).json({ message: "Internal server error", error: error }); // Return after sending response
        }
    }


    async GetAllPost(req: Req, res: Res) {
        try {
          console.log("Full URL:", req.originalUrl); // Log the full URL
          console.log("Provider ID from Params:", req.params.providerId); // Log the provider ID from the request
      
          const providerId = new mongoose.Types.ObjectId(req.params.providerId);
          console.log("Converted Provider ID:", providerId); // Ensure correct conversion
      
          const services = await this.usergetpostusecaseinterface.GetAllPost(providerId);
          console.log("Fetched Services:", services); // Log fetched services
      
          res.status(200).json(services);
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

            // Call use case to update the post
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
            const postId = new mongoose.Types.ObjectId(req.params.postId); // Get the post ID from params

            // Call use case to delete the post
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
      const serviceId = new mongoose.Types.ObjectId(req.params.id); // Assuming the ID comes from the URL

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
