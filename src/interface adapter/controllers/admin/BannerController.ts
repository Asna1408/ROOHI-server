import { CreateBannerUsecaseInterface } from "../../../entities/useCaseInterfaces/admin/CreateBannerUsecaseInterface";
import { DeleteBannerUsecaseInterface } from "../../../entities/useCaseInterfaces/admin/DeleteBannerUsecaseInterface";
import { GetBannerByIdUseCaseInterface } from "../../../entities/useCaseInterfaces/admin/GetBannerByIdUsecaseInterface";
import { GetBannerUsecaseInterface } from "../../../entities/useCaseInterfaces/admin/GetBannerUsecaseInterface";
import { UpdateBannerUsecaseInterface } from "../../../entities/useCaseInterfaces/admin/UpdateBannerUsecaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";

export class BannerController{
    constructor(private icreatebannerusecaseinterface : CreateBannerUsecaseInterface,
        private igetallbannerusecaseinterface : GetBannerUsecaseInterface,
        private igetBannerByIdusecaseinterface : GetBannerByIdUseCaseInterface,
        private iupdateBannerusecaseinterface : UpdateBannerUsecaseInterface,
        private ideleteBannerusecaseinterface : DeleteBannerUsecaseInterface
    ){}


    async createBanner(req: Req, res: Res) {
        try {
            console.log("Request body:", req.body);

            // Extract data from request body
            const { title, description , isActive} = req.body;

            if (!title || !description ) {
                return res.status(400).json({ message: "Missing required fields" }); 
            }

            const BannerData = req.body;

            const newBanner = await this.icreatebannerusecaseinterface.createBanner(BannerData);
            return res.status(201).json({ message: "Banner created successfully", Banner: newBanner }); 
        } catch (error) {
            console.error("Error adding Banner:", error);
            return res.status(500).json({ message: "Internal server error", error: error }); 
        }
    }


    async GetAllBanner(req: Req, res: Res): Promise<void> {
        try {
          const page = parseInt(req.query.page as string, 10) || 1; 
          const limit = parseInt(req.query.limit as string, 10) || 10; 
          const skip = (page - 1) * limit;
      
          const { banners, total } = await this.igetallbannerusecaseinterface.getBanners(skip, limit);
      
          res.status(200).json({
            banners,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
          });
        } catch (error) {
          console.error('Error fetching Banners:', error);
          res.status(500).json({ message: error });
        }
      }
      


      async editBanner(req: Req, res: Res) {
        try {
            const BannerId = req.params.BannerId; 
            const updatedData = req.body; 

            const updatedBanner = await this.iupdateBannerusecaseinterface.updateBanner(BannerId, updatedData);
            
            if (!updatedBanner) {
                return res.status(404).json({ message: "Banner not found" });
            }

            return res.status(200).json({ message: "Banner updated successfully", updatedBanner });
        } catch (error) {
            console.error("Error updating banner:", error);
            return res.status(500).json({ message: "Internal server error", error });
        }
    }


    async getBannerbyId(req: Req, res: Res) {
        const { BannerId } = req.params;
    
        try {
          const Banner = await this.igetBannerByIdusecaseinterface.getBannerById(BannerId);
          if (!Banner) {
            return res.status(404).json({ message: 'Banner not found' });
          }
          return res.status(200).json(Banner);
        } catch (error) {
          return res.status(500).json({ message: 'Server error', error:error});
        }
      }
      


    async deleteBanner(req: Req, res: Res): Promise<any> {
        try {
            const BannerId = req.params.BannerId; 

            const deletedBanner = await this.ideleteBannerusecaseinterface.deleteBanner(BannerId);
            
            if (!deletedBanner) {
                return res.status(404).json({ message: "Banner not found" });
            }

            return res.status(200).json({ message: "Banner deleted successfully" });
        } catch (error) {
            console.error("Error deleting Banner:", error);
            return res.status(500).json({ message: "Internal server error", error });
        }
    }

}