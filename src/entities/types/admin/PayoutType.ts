
export type PayoutType = {
  providerId: string;
  amount: number;
  currency: string;
  stripeTransferId?: string | null;
  status: 'pending' | 'completed' | 'failed';
  createdAt?: Date;
  updatedAt?: Date;
  failureMessage?: string;
}