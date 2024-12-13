import { PayoutType } from "../../../entities/types/admin/PayoutType";
import { Payout } from "../../../frameworks/database/models/admin/PayoutModel";
import { IPayoutRepository } from "./IPayoutRepository";

export class PayoutRepository implements IPayoutRepository {
    async createPayoutRecord(data: PayoutType):Promise<PayoutType | any> {
      try{
      return await Payout.create(data);
      }catch(error){
        throw new Error("Error occured creating Payout" + error)
      }
    }
  
    async updatePayoutStatus(payoutId: string, status: string, transferId: string | null):Promise<PayoutType | any> {
      try{
      return await Payout.findByIdAndUpdate(
        payoutId,
        { status, stripeTransferId: transferId },
        { new: true }
      );
    }catch(error){
      throw new Error("Error occured updating Payoutstatus" + error)
    }
    }
  
    async getPayoutsByStatus(status: string):Promise<PayoutType |any> {
      try{
      return await Payout.find({ status });
    }catch(error){
      throw new Error("Error occured fetching Payoutstatus" + error)
    }
    }
  }
  