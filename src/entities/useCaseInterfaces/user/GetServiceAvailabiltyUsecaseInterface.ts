interface ServiceAvailability {
    availableDates: Date[]; // Available dates are Date objects
    bookedDates: string[];  // Booked dates as ISO string format
}


export interface GetServiceAvailabiltyUsecaseInterface{
    getdates(serviceId: string): Promise<ServiceAvailability> 

}