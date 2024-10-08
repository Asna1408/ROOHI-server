import mongoose, { Types } from "mongoose";
import { IBookingRepository } from "../../interface adapter/respository/user/IBookingRepository";
import { ObjectId } from "mongodb";
import { UserCancelBookingUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserCancelBookingUseCaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";

export class UserCancelBookingUseCase implements UserCancelBookingUseCaseInterface {
    constructor(private ibookingrepository: IBookingRepository,
        private iservicerepository:IPostRepository
    ) {}

    async CancelBook(bookingId: string, serviceId: string, canceledDate: Date) {
        await this.ibookingrepository.cancelBooking(bookingId);

        const service = await this.iservicerepository.getPostById(serviceId);
        service.availability.push(canceledDate);

        await this.iservicerepository.updateAvailability(serviceId, service.availability);
    }

}