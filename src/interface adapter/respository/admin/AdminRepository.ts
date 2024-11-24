
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
        return await AdminModel.findOne({email});
    }

    // async GetAllUsers():Promise< any >{
    //     return await UserModel.find().sort({ createdAt: -1 });
    // }

    async GetAllUsers(skip: number, limit: number): Promise<[UserType[], number]> {
      const users = await UserModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
    
      const total = await UserModel.countDocuments(); // Get the total count of users
    
      return [users as unknown as UserType[], total]; // Return the users and total count
    }
    

    async BlockUser(userId: string): Promise<UserType | null> {
        return await UserModel.findByIdAndUpdate(
          userId,
          { isBlocked: true },
          { new: true }
        );
      }
    
      async UnblockUser(userId: string): Promise<UserType | null> {
        return await UserModel.findByIdAndUpdate(
          userId,
          { isBlocked: false },
          { new: true }
        );
      }

      async addServiceCategory(type_name: string, description: string): Promise<any> {
        const serviceCategory = new ServiceCategoryModel({ type_name, description });
        return await serviceCategory.save();
      }
    
      // async getServiceCategories(): Promise<any> {
      //   return await ServiceCategoryModel.find();
      // }
    
      async getServiceCategories(skip: number, limit: number): Promise<[ServiceCategory[], number]> {
        const categories = await ServiceCategoryModel.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec();
      
        const total = await ServiceCategoryModel.countDocuments(); // Total count of documents
        return [categories as unknown as ServiceCategory[], total];
      }
      

      async getServiceCategoryById(id: string): Promise<any> {
        return await ServiceCategoryModel.findById(id);
      }
    
      async editServiceCategory(id: string, type_name: string, description: string): Promise<any> {
        return await ServiceCategoryModel.findByIdAndUpdate(id, { type_name, description }, { new: true });
      }
    
      async deleteServiceCategory(id: string): Promise<any> {
        return await ServiceCategoryModel.findByIdAndDelete(id);
      }

      // async getBookingDetails():Promise<BookingType | any> {
        
      //     const bookings = await BookingModel.find()
      //       .populate({
      //         path: 'user_id',
      //         select: 'name email', // Selecting the needed fields from the User model
      //       })
      //       .populate({
      //         path: 'service_id',
      //         select: 'service_name price', // Selecting service name and price from the Service model
      //       })
      //       .exec();
      //     return bookings;
      //   }

      async getBookingDetails(skip: number, limit: number): Promise<[BookingType[], number]> {
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
        
        const total = await BookingModel.countDocuments(); // Get the total count of documents

  return [bookings as BookingType[], total];
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
          return await UserModel.countDocuments();
        };

        

        async getBookingCount():Promise<BookingType | any> {
          return await BookingModel.countDocuments();
        };

        


        async calculateTotalRevenue() :Promise<BookingType> {
          const revenue = await BookingModel.aggregate([
            // { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
          ]);
          return revenue[0]?.total || 0;
        };

       

        async getRevenueOverTime(filter: string): Promise<BookingType | any> {
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
        }
        


        async getBookingStatusDistribution():Promise<BookingType | any> {
          return await BookingModel.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
          ]);
        };
        

        async createBanner(data:BannerType): Promise<BannerType | any> {
          return await BannerModel.create(data);
        }
      
        async getBanners(skip: number, limit: number): Promise<[BannerType[], number]> {
          const banners = await BannerModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        
          const total = await BannerModel.countDocuments(); // Total number of banners
          return [banners as unknown as BannerType[], total];
        }
        

        async getBannerById(BannerId:string) : Promise <BannerType | any> {
          return await BannerModel.findById(BannerId)
        }

      
        async updateBanner(BannerId: string, data: BannerType): Promise<BannerType | null> {
          return await BannerModel.findByIdAndUpdate(BannerId, data, { new: true });
        }
      
        async deleteBanner(BannerId: string): Promise<BannerType | null> {
          return await BannerModel.findByIdAndDelete(BannerId);
        }


        async createPayout(providerId: string, amount: number): Promise<string> {
          const providerStripeAccount = await this.getProviderStripeAccount(providerId);
          if (!providerStripeAccount) {
              throw new Error("Provider does not have a Stripe account.");
          }

          const account = await stripe.accounts.retrieve(providerStripeAccount);
        if (account.capabilities?.transfers !== 'active') {
            // If 'transfers' capability is not active, request it
            const updatedAccount = await stripe.accounts.update(providerStripeAccount, {
                capabilities: {
                    transfers: { requested: true },
                },
            });
            console.log(`Transfer capability requested for account ${providerStripeAccount}`);
            console.log(updatedAccount,"update transfer acocunt")
        }
  
          const payout = await stripe.transfers.create({
              amount: amount * 100, // convert to cents
              currency: 'usd',
              destination: providerStripeAccount,
              transfer_group: `provider_${providerId}`,
          });
  
          return payout.id;
      }
  
      async getProviderStripeAccount(providerId: string): Promise<string | null> {
        const objectId =  new mongoose.Types.ObjectId(providerId);

        const provider = await UserModel.findById(objectId);
          return provider?.stripeAccountId || null;
      }


      }
