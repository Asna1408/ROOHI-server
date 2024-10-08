export interface GetServiceAvailabiltyUsecaseInterface{
    getdates(serviceId: string): Promise<Date[]> 
}