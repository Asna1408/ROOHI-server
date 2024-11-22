import { BookingType } from "../../entities/types/user/BookingType";
import { AdminDashboardUsecaseInterface } from "../../entities/useCaseInterfaces/admin/AdminDashboardUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class AdminDashboardUsecase implements AdminDashboardUsecaseInterface{
    constructor(private iadminrepository:IAdminRepository){}

    async totalRevenue() :Promise<BookingType>{
        return await this.iadminrepository.calculateTotalRevenue();
      };

      async revenueOverTime (filter: string) :Promise<BookingType>{
        return await this.iadminrepository.getRevenueOverTime(filter);
      };

      async bookingStatusDistribution() :Promise<BookingType>{
        return await this.iadminrepository.getBookingStatusDistribution();
      };



}