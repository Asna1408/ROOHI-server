

export interface AdminPayoutUsecaseInterface {
   
    initiatePayout(providerId: string, amount: number): Promise<string>;

    }
    