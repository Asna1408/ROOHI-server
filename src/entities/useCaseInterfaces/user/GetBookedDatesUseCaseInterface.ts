export interface GetBookedDatesUseCaseInterface{
       getbookeddates(serviceId: string): Promise<Date[]> 
}