import Stripe from "stripe";
import { AdminPayoutUsecaseInterface } from "../../entities/useCaseInterfaces/admin/AdminPayoutUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";
import { UserModel } from "../../frameworks/database/models/user/userModel";
const stripe = new Stripe('sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb');

export class AdminPayoutUsecase implements AdminPayoutUsecaseInterface{
    constructor(private iadminrepository:IAdminRepository){}

    async initiatePayout(providerId: string, amount: number): Promise<string> {
        // Business logic for validations could go here (e.g., min amount check)

        const payoutId = await this.iadminrepository.createPayout(providerId, amount);
        return payoutId;
    }
} 