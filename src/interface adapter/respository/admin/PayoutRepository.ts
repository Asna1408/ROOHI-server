import { PayoutType } from "../../../entities/types/admin/PayoutType";
import { Payout } from "../../../frameworks/database/models/admin/PayoutModel";
import { IPayoutRepository } from "./IPayoutRepository";

export class PayoutRepository implements IPayoutRepository {
    async createPayoutRecord(data: PayoutType):Promise<PayoutType | any> {
      return await Payout.create(data);
    }
  
    async updatePayoutStatus(payoutId: string, status: string, transferId: string | null):Promise<PayoutType | any> {
      return await Payout.findByIdAndUpdate(
        payoutId,
        { status, stripeTransferId: transferId },
        { new: true }
      );
    }
  
    async getPayoutsByStatus(status: string):Promise<PayoutType |any> {
      return await Payout.find({ status });
    }
  }
  