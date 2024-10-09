import mongoose from "mongoose";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import { GetBookedDatesUseCaseInterface } from "../../entities/useCaseInterfaces/user/GetBookedDatesUseCaseInterface";


export class GetBookedDatesUseCase implements GetBookedDatesUseCaseInterface {
    constructor(private ipostrepository: IPostRepository,
        private ibookrepository:IBookingRepository) {}

    async getbookeddates(serviceId: string): Promise<Date[]> {
        const service = await this.ipostrepository.getPostById(serviceId);

        if (!service) {
            throw new Error('Service not found');
        }

        const bookedDates = await this.ibookrepository.getServiceDate(serviceId);
    const bookedDateStrings = bookedDates.map((booking: { booking_date: { toISOString: () => any; }; }) => booking.booking_date.toISOString());

        return service.availability; // Assuming availability is an array of Date objects
    }
}