import { Model } from "mongoose";
import { UserType } from "../../../entities/types/user/UserType";
import { UserModel } from "../../../frameworks/database/models/user/userModel";
import { IUserRepository } from "./IUserRepository";


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
        return await UserModel.create(user);
    }

   async  FindByEmail(email: string): Promise<UserType | null> {
         return await UserModel.findOne({email: email});
    }

    async GoogleOAuth(user: UserType): Promise<any> {
        const newUser = await UserModel.create(user);   
        return newUser;
      }

 
    //for unverified user
    async FindByEmailAndDelete(email: string): Promise<boolean> {
        const deleted = await UserModel.findOneAndDelete({ email: email });
          

        if (deleted) {
          return true;
        } else {
          return false;
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
          { new: true } // Return the updated document
        );
        return updatedUser;
      } catch (error) {
        console.error("Error updating verification status:", error);
        return null;
      }
    }

    async UpdateUser(email: string, updateData: any): Promise<any> {
      return await UserModel.updateOne({ email }, { $set: updateData });
    }

    async UpdatePassword(email:string,password:string):Promise<any>{
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
    }

    async EditProfile(updateData: any, _id: string): Promise<any> {
      return await UserModel.findByIdAndUpdate(_id, { $set: updateData }, { new: true });
    }
    

    

}