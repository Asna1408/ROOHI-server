import  Stripe  from "stripe";
import { AdminPayoutUsecaseInterface } from "../../../entities/useCaseInterfaces/admin/AdminPayoutUsecaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";
const stripe = new Stripe('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');

import { IAdminRepository } from "../../respository/admin/IAdminRepsitory";
import { UserModel } from "../../../frameworks/database/models/user/userModel";

export class PayoutController {
    constructor(
      private adminpayoutusecaseinterface: AdminPayoutUsecaseInterface,
     
    ) {}
  
    // async createOrUpdateProviderAccount(req: Req, res: Res) {
    //     const { providerId } = req.body;
    
    //     try {
    //         // Retrieve the provider's Stripe account ID from the database using the providerId
    //         const provider = await UserModel.findById(providerId);
    
    //         if (!provider) {
    //             return res.status(404).json({ error: 'Provider not found' });
    //         }
    
    //         const stripeAccountId = provider.stripeAccountId;
    
    //         if (!stripeAccountId) {
    //             return res.status(400).json({ error: 'Provider does not have a connected Stripe account.' });
    //         }
    
    //         // Retrieve the connected account for the provider from Stripe
    //         const account = await stripe.accounts.retrieve(stripeAccountId);
    
    //         // Check if the account already has the 'transfers' capability
    //         if (account.capabilities?.transfers !== 'active') {
    //             // Request the 'transfers' capability if it's not already enabled
    //             const updatedAccount = await stripe.accounts.update(stripeAccountId, {
    //                 capabilities: {
    //                     transfers: { requested: true },  // Correctly request the capability with an object
    //                 },
    //             });
    
    //             return res.status(200).json({
    //                 message: `Transfer capability requested for provider ${providerId}`,
    //                 account: updatedAccount,
    //             });
    //         } else {
    //             return res.status(200).json({
    //                 message: `Provider ${providerId} already has the 'transfers' capability.`,
    //                 account,
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error creating/updating provider account:', error);
    
    //         // Check if it's a Stripe error and provide a specific message
    //         if (error instanceof Error && error.hasOwnProperty('type')) {
    //             return res.status(400).json({ error: error.message });
    //         }
    
    //         // For other errors, send a general error message
    //         return res.status(500).json({ error: 'Internal server error.' });
    //     }
    // }
    
    
    async initiatePayout(req: Req, res: Res) {
        const { providerId, amount } = req.body;
        try {
            const payoutId = await this.adminpayoutusecaseinterface.initiatePayout(providerId, amount);
            res.status(200).json({ message: 'Payout initiated', payoutId });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
  }
  