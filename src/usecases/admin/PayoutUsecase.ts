import Stripe from "stripe";
import { IPayoutRepository } from "../../interface adapter/respository/admin/IPayoutRepository";
import { PayoutUsecaseInterface } from "../../entities/useCaseInterfaces/admin/PayoutUsecaseInterface";
import { PayoutType } from "../../entities/types/admin/PayoutType";
const stripe = new Stripe('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');

export class PayoutUseCase implements PayoutUsecaseInterface {
  constructor(private payoutRepository: IPayoutRepository) {}

  async processPayout(providerId: string, stripeAccountId: string, amount: number, currency: string): Promise<PayoutType | any> {
    // Create a payout record without the stripeTransferId initially
    const payoutRecord = await this.payoutRepository.createPayoutRecord({
      providerId,
      amount,
      currency,
      status: "pending",
    });

    try {
      // Process the transfer via Stripe
      // Retrieve account information
const account = await stripe.accounts.retrieve(stripeAccountId);

// Check if capabilities exist and if 'transfers' capability is enabled
// if (account.capabilities?.transfers !== 'active') {
//   throw new Error("The connected account is not capable of receiving transfers.");
// }

// Proceed with the transfer
const transfer = await stripe.transfers.create({
  amount: Math.round(amount * 100), // Convert to cents
  currency,
  destination: stripeAccountId,
});


      // Update the payout record with the transfer details
      await this.payoutRepository.updatePayoutStatus(payoutRecord._id, "completed", transfer.id);

      return transfer;
    } catch (error) {
      // If the transfer fails, update the record to "failed"
      await this.payoutRepository.updatePayoutStatus(payoutRecord._id, "failed", null);
      throw error;
    }
  }

  async getPayoutsByStatus(status: string): Promise<PayoutType | any> {
    try{
    return await this.payoutRepository.getPayoutsByStatus(status);
    }catch(error){
      throw new Error("error on fetching payout status")
    }
  }
}
