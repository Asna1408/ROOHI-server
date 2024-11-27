import { PayoutType } from "../../types/admin/PayoutType";

export interface PayoutUsecaseInterface{

    processPayout(providerId: string, stripeAccountId: string, amount: number, currency: string) :Promise<PayoutType | any>
    getPayoutsByStatus(status: string):Promise<PayoutType | any>
}