
import mongoose from "mongoose";
import { AdminType } from "../../../entities/types/admin/AdminType";
import { ServiceCategory } from "../../../entities/types/admin/ServiceCategoryType";
import { BookingType } from "../../../entities/types/user/BookingType";
import { UserType } from "../../../entities/types/user/UserType";
import { AdminModel } from "../../../frameworks/database/models/admin/AdminModel";
import { ServiceCategoryModel } from "../../../frameworks/database/models/admin/ServiceCategoryModel";
import BookingModel from "../../../frameworks/database/models/user/BookingModel";
import { UserModel } from "../../../frameworks/database/models/user/userModel";
import { IAdminRepository } from "./IAdminRepsitory";
import { BannerModel } from "../../../frameworks/database/models/admin/BannerModel";
import { BannerType } from "../../../entities/types/admin/BannerType";
import Stripe from "stripe";
import { Payout } from "../../../frameworks/database/models/admin/PayoutModel";
import { PayoutType } from "../../../entities/types/admin/PayoutType";
const stripe = new Stripe('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');


export class AdminRepository implements IAdminRepository{

    async LoginAdmin(email:string):Promise<AdminType| null >{
      try{
        return await AdminModel.findOne({email});
      }catch(error){
        throw new Error("Error occured Admin Login")
      }
    }

    async GetAllUsers(skip: number, limit: number): Promise<[UserType[], number]> {
      try{
      const users = await UserModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

        console.log(users,"users repository")
      const total = await UserModel.countDocuments(); 
      return [users as unknown as UserType[], total]; 
    
    }catch(error){
      throw new Error("Error occured Admin Login")
    }
    }
    

    async BlockUser(userId: string): Promise<UserType | null> {
      try{  
      return await UserModel.findByIdAndUpdate(
          userId,
          { isBlocked: true },
          { new: true }
        );
      }catch(error){
        throw new Error("Error occured Admin Login")
      }
      }
    
      async UnblockUser(userId: string): Promise<UserType | null> {
        try{  
        return await UserModel.findByIdAndUpdate(
          userId,
          { isBlocked: false },
          { new: true }
        );
      }catch(error){
          throw new Error("Error occured Admin Login")
        }
      }

      async addServiceCategory(type_name: string, description: string): Promise<any> {
        try{  
        const serviceCategory = new ServiceCategoryModel({ type_name, description });
        return await serviceCategory.save();
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
      }
    
      async getServiceCategories(skip: number, limit: number): Promise<[ServiceCategory[], number]> {
        try{  
        const categories = await ServiceCategoryModel.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec();
      
        const total = await ServiceCategoryModel.countDocuments(); 
        return [categories as unknown as ServiceCategory[], total];
      }catch(error){
        throw new Error("Error occured Admin Login")
      }
      }
      

      async getServiceCategoryById(id: string): Promise<any> {
        try{  
        return await ServiceCategoryModel.findById(id);
      }catch(error){
        throw new Error("Error occured Admin Login")
      }
      }
    
      async editServiceCategory(id: string, type_name: string, description: string): Promise<any> {
        try{  
        return await ServiceCategoryModel.findByIdAndUpdate(id, { type_name, description }, { new: true });
      }catch(error){
        throw new Error("Error occured Admin Login")
      }
      }
    
      async deleteServiceCategory(id: string): Promise<any> {
        try{  
        return await ServiceCategoryModel.findByIdAndDelete(id);
      }catch(error){
        throw new Error("Error occured Admin Login")
      }
      }


      async getBookingDetails(skip: number, limit: number): Promise<[BookingType[], number]> {
        try{  
        const bookings = await BookingModel.find()
          .populate({
            path: 'user_id',
            select: 'name email',
          })
          .populate({
            path: 'service_id',
            select: 'service_name price',
          })
          .skip(skip)
          .limit(limit)
          .lean() // Converts Mongoose documents to plain JavaScript objects
          .exec();
        
        const total = await BookingModel.countDocuments(); 

  return [bookings as BookingType[], total];
}catch(error){
  throw new Error("Error occured Admin Login")
}
      }
      

        async findBookingById(bookingId: string):Promise<BookingType | any>  {
      

          const isValidObjectId = mongoose.Types.ObjectId.isValid(bookingId);
          if (!isValidObjectId) {
            throw new Error('Invalid booking ID format');
          }

          try {
            return await BookingModel.findById(bookingId)
              .populate({
                path: 'user_id',
                select: 'name email phone',
              })
              .populate({
                path: 'service_id',
                select: 'service_name price',
              })
              .exec();
      
       
          } catch (error) {
            console.error('Error fetching booking by ID:', error);
            throw new Error('Failed to fetch booking');
          }
        }


        async getUserCount():Promise<UserType | any> {
          try{  
          return await UserModel.countDocuments();
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        };

        

        async getBookingCount():Promise<BookingType | any> {
          try{  
          return await BookingModel.countDocuments();
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        };

        


        async calculateTotalRevenue() :Promise<BookingType> {
          try{  
          const revenue = await BookingModel.aggregate([
            // { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
          ]);
          return revenue[0]?.total || 0;
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        };

       

        async getRevenueOverTime(filter: string): Promise<BookingType | any> {
          try{  
          let groupByStage: any = {};
          let projectTimePeriod: any = {};
        
          switch (filter) {
            case "week":
              groupByStage = {
                _id: { $week: "$created_at" }, // Group by week
                totalRevenue: { $sum: "$amount" },
              };
              projectTimePeriod = { timePeriod: "$_id", totalRevenue: 1 };
              break;
        
            case "month":
              groupByStage = {
                _id: { $month: "$created_at" }, // Group by month
                totalRevenue: { $sum: "$amount" },
              };
              projectTimePeriod = {
                timePeriod: {
                  $switch: {
                    branches: [
                      { case: { $eq: ["$_id", 1] }, then: "Jan" },
                      { case: { $eq: ["$_id", 2] }, then: "Feb" },
                      { case: { $eq: ["$_id", 3] }, then: "Mar" },
                      { case: { $eq: ["$_id", 4] }, then: "Apr" },
                      { case: { $eq: ["$_id", 5] }, then: "May" },
                      { case: { $eq: ["$_id", 6] }, then: "Jun" },
                      { case: { $eq: ["$_id", 7] }, then: "Jul" },
                      { case: { $eq: ["$_id", 8] }, then: "Aug" },
                      { case: { $eq: ["$_id", 9] }, then: "Sep" },
                      { case: { $eq: ["$_id", 10] }, then: "Oct" },
                      { case: { $eq: ["$_id", 11] }, then: "Nov" },
                      { case: { $eq: ["$_id", 12] }, then: "Dec" },
                    ],
                    default: "Unknown",
                  },
                },
                totalRevenue: 1,
              };
              break;
        
            case "year":
              groupByStage = {
                _id: { $year: "$created_at" }, // Group by year
                totalRevenue: { $sum: "$amount" },
              };
              projectTimePeriod = { timePeriod: "$_id", totalRevenue: 1 };
              break;
        
            default:
              throw new Error("Invalid filter type. Use 'week', 'month', or 'year'.");
          }
        
          return await BookingModel.aggregate([
            { $match: { created_at: { $ne: null } } }, // Ensure created_at exists
            { $group: groupByStage },
            { $project: projectTimePeriod },
            { $sort: { "_id": 1 } }, // Sort by time period
          ]);
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        }
        


        async getBookingStatusDistribution():Promise<BookingType | any> {
          try{  
          return await BookingModel.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
          ]);
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        };
        

        async createBanner(data:BannerType): Promise<BannerType | any> {
          try{  
          return await BannerModel.create(data);
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        }
      
        async getBanners(skip: number, limit: number): Promise<[BannerType[], number]> {
          try{  
          const banners = await BannerModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        
          const total = await BannerModel.countDocuments(); 
          return [banners as unknown as BannerType[], total];
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        }
        

        async getBannerById(BannerId:string) : Promise <BannerType | any> {
          try{  
          return await BannerModel.findById(BannerId)
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        }

      
        async updateBanner(BannerId: string, data: BannerType): Promise<BannerType | null> {
          try{  
          return await BannerModel.findByIdAndUpdate(BannerId, data, { new: true });
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        }
      
        async deleteBanner(BannerId: string): Promise<BannerType | null> {
          try{  
          return await BannerModel.findByIdAndDelete(BannerId);
        }catch(error){
          throw new Error("Error occured Admin Login")
        }
        }


      }
