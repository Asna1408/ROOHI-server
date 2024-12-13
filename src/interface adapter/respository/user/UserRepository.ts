import { Model } from "mongoose";
import { UserType } from "../../../entities/types/user/UserType";
import { UserModel } from "../../../frameworks/database/models/user/userModel";
import { IUserRepository } from "./IUserRepository";
import { BannerModel } from "../../../frameworks/database/models/admin/BannerModel";
import { BannerType } from "../../../entities/types/admin/BannerType";


export class UserRepository implements IUserRepository{ 

  async getPaginatedData<T extends Document>(
    model: Model<T>,
    page: number,
    limit: number,
    populateFields: string[] = []
  ): Promise<{ totalRecords: number; records: T[] }> {
    const skip = (page - 1) * limit;
    const totalRecords = await model.countDocuments();
    const records = await model
      .find()
      .skip(skip)
      .limit(limit)
      .populate(populateFields)
      .exec();

    return {
      totalRecords,
      records,
    };
  }
    async RegisterUser(user: UserType): Promise<any> {
      try{
        return await UserModel.create(user);
      }catch(error){
        throw new Error("error occured when creating a user")
      }
    }

   async FindByEmail(email: string): Promise<UserType | null> {
    try{
         return await UserModel.findOne({email: email});
    }catch(error){
      throw new Error("error occured when finding the user")
    }

    }

    async GoogleOAuth(user: UserType): Promise<any> {
      try{
        const newUser = await UserModel.create(user);   
        return newUser;
      }catch(error){
        throw new Error("error occured when creating the user through google")
      }
      }

 
    //for unverified user
    async FindByEmailAndDelete(email: string): Promise<boolean> {

      try{
        const deleted = await UserModel.findOneAndDelete({ email: email });
          

        if (deleted) {
          return true;
        } else {
          return false;
        }
      }catch(error){
        throw new Error("error occured when deleting the unverified user")
      }
      }
         

    //for resend otp store  
    async UpdateUserOtp(email: string, otp: string): Promise<any> {
        try {
          const updatedUser = await UserModel.findOneAndUpdate(
            { email },                
            { $set: { otp } },        
            { new: true }              
          );
    
          return updatedUser;
        } catch (error) {
          console.error("Error updating OTP:", error);
          return null;
        }
    
    }

    async UpdateVerifiedStatus(email: string, status: boolean): Promise<any> {
      try {
        const updatedUser = await UserModel.findOneAndUpdate(
          { email },
          { $set: { verified: status } },
          { new: true } 
        );
        return updatedUser;
      } catch (error) {
        console.error("Error updating verification status:", error);
        return null;
      }
    }

    async UpdateUser(email: string, updateData: any): Promise<any> {

      try{
      return await UserModel.updateOne({ email }, { $set: updateData });
      }catch(error){
        throw new Error("Error occured when updating the user data")
      }
    }

    async UpdatePassword(email:string,password:string):Promise<any>{
      try{
       const updated = await UserModel.findOneAndUpdate({email},{
        $set:{
          password:password
        }
      },{$new:true})

      if(updated){
        return true;
      }else{
        return false;
      }
    }catch(error){
      throw new Error("Error Occured when updating the banner")
    }
    }

    

  async getUserById(userId: string): Promise<UserType | any> {
      try {
          const user = await UserModel.findById(userId).select("-password -__v");;
          return user 
      } catch (error) {
          throw new Error(`Error fetching user: ${error}`);
      }
  }
    
  async updateProfile(userId: string, updateData: Partial<UserType>): Promise<UserType | any> {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        return updatedUser 
    } catch (error) {
        throw new Error(`Error updating profile: ${error}`);
    }
}

    async getActiveBanners():Promise<BannerType | any> {
      try{
      return await BannerModel.find({ isActive: true }); 
    }catch(error){
      throw new Error("error occured when finding the banners")
    }

  }

}