import { AdminType } from "../../../entities/types/admin/AdminType";
import { BannerType } from "../../../entities/types/admin/BannerType";
import { PayoutType } from "../../../entities/types/admin/PayoutType";
import { ServiceCategory } from "../../../entities/types/admin/ServiceCategoryType";
import { BookingType } from "../../../entities/types/user/BookingType";
import { UserType } from "../../../entities/types/user/UserType";


export interface IAdminRepository{
    LoginAdmin(email:string):Promise< AdminType | null >
    GetAllUsers(skip: number, limit: number): Promise<[UserType[], number]>
    BlockUser(userId: string): Promise<UserType | null>;
    UnblockUser(userId: string): Promise<UserType | null>;
    addServiceCategory(type_name: string, description: string): Promise<any>;
    getServiceCategories(skip: number, limit: number): Promise<[ServiceCategory[], number]>
  getServiceCategoryById(id: string): Promise<any>;
  editServiceCategory(id: string, type_name: string, description: string): Promise<any>;
  deleteServiceCategory(id: string): Promise<any>;
  getBookingDetails(skip: number, limit: number): Promise<[BookingType[], number]>
  findBookingById(bookingId: string):Promise<BookingType | any>
  getUserCount():Promise<UserType | any>
  getBookingCount():Promise<BookingType | any> 
  calculateTotalRevenue() :Promise<BookingType>
  getRevenueOverTime (filter: string):Promise<BookingType | any> 
  getBookingStatusDistribution():Promise<BookingType | any>
  createBanner(data:BannerType): Promise<BannerType | any>
  getBanners(skip: number, limit: number): Promise<[BannerType[], number]> 
   getBannerById(BannerId:string) : Promise <BannerType>
  updateBanner(BannerId: string, data: BannerType): Promise<BannerType | null> 
  deleteBanner(BannerId: string): Promise<BannerType | null>
  
}