import { BookingType } from "../../types/user/BookingType";


export interface AdminDashboardUsecaseInterface{
   
    totalRevenue() :Promise<BookingType>
    revenueOverTime (filter: string) :Promise<BookingType>
    bookingStatusDistribution() :Promise<BookingType>

    }
    