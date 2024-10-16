
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


export class AdminRepository implements IAdminRepository{

    async LoginAdmin(email:string):Promise<AdminType| null >{
        return await AdminModel.findOne({email});
    }

    async GetAllUsers():Promise< any >{
        return await UserModel.find().sort({ createdAt: -1 });
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
    
      async getServiceCategories(): Promise<any> {
        return await ServiceCategoryModel.find();
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

      async getBookingDetails():Promise<BookingType | any> {
        
          const bookings = await BookingModel.find()
            .populate({
              path: 'user_id',
              select: 'name email', // Selecting the needed fields from the User model
            })
            .populate({
              path: 'service_id',
              select: 'service_name price', // Selecting service name and price from the Service model
            })
            .exec();
          return bookings;
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


      }
