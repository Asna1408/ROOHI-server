import { PayoutType } from "../../../entities/types/admin/PayoutType"

export interface IPayoutRepository{
    createPayoutRecord(data: PayoutType):Promise<PayoutType | any>
    updatePayoutStatus(payoutId: string, status: string, transferId: string | null):Promise<PayoutType | any>
    getPayoutsByStatus(status: string):Promise<PayoutType |any>
}