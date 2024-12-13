import { BookingType } from "../../entities/types/user/BookingType";
import { GetBookingCountUsecaseInterface } from "../../entities/useCaseInterfaces/admin/GetBookingCountUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetBookingCountUsecase implements GetBookingCountUsecaseInterface{
     constructor(private iadminrepository:IAdminRepository){}

async getBookingCount() :Promise<BookingType>{
  try{
    return await this.iadminrepository.getBookingCount();
  }catch(error){
    throw new Error("error on getting booking count")
  }
  };

}