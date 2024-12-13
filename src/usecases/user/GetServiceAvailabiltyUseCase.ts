import { ServiceType } from "../../entities/types/user/ServicesType";
import { GetServiceAvailabiltyUsecaseInterface } from "../../entities/useCaseInterfaces/user/GetServiceAvailabiltyUsecaseInterface";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";

interface ServiceAvailability {
    availableDates: Date[]; // Available dates are Date objects
    bookedDates: string[];  // Booked dates as ISO string format
}

export class GetServiceAvailabiltyUseCase implements GetServiceAvailabiltyUsecaseInterface {
    constructor(private ipostrepository: IPostRepository,
        private ibookrepository:IBookingRepository) {}

    async getdates(serviceId: string): Promise<ServiceAvailability> {
       
       try{
        const service = await this.ipostrepository.getPostById(serviceId);

        if (!service) {
            throw new Error('Service not found');
        }
        const bookedDates = await this.ibookrepository.getServiceDate(serviceId);
        const bookedDateStrings = bookedDates.map((booking: { booking_date: { toISOString: () => any; }; }) => booking.booking_date.toISOString());
    
           const availableDates = service.availability
        return {
            availableDates,
            bookedDates: bookedDateStrings,
          }; // Assuming availability is an array of Date objects
        }catch(error){
            throw new Error("Error occured when taking the dates")
        }
    
        }
}