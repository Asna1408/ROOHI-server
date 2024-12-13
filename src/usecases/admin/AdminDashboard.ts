import { BookingType } from "../../entities/types/user/BookingType";
import { AdminDashboardUsecaseInterface } from "../../entities/useCaseInterfaces/admin/AdminDashboardUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class AdminDashboardUsecase implements AdminDashboardUsecaseInterface{
    constructor(private iadminrepository:IAdminRepository){}

    async totalRevenue() :Promise<BookingType>{
      try{
        return await this.iadminrepository.calculateTotalRevenue();
      }catch(error){
        throw new Error("Error occcured Total Revenue")
      }
      };

      async revenueOverTime (filter: string) :Promise<BookingType>{
        try{
        return await this.iadminrepository.getRevenueOverTime(filter);
      }catch(error){
        throw new Error("Error occcured fetching revenue")
      }
      };

      async bookingStatusDistribution() :Promise<BookingType>{
        try{
        return await this.iadminrepository.getBookingStatusDistribution();
      }catch(error){
        throw new Error("Error occcured booking status in dashboard")
      }
      };



}