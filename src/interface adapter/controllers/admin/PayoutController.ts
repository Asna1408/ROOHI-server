import { PayoutUseCase } from "../../../usecases/admin/PayoutUsecase";
import { Req, Res } from "../../../frameworks/Types/servertype";

export class PayoutController {
  constructor(private payoutUseCase: PayoutUseCase) {}

  async initiatePayout(req: Req, res: Res) {
    const { providerId, stripeAccountId, amount, currency } = req.body;

    try {
      const transfer = await this.payoutUseCase.processPayout(providerId, stripeAccountId, amount, currency);
      res.status(200).json({ message: "Payout processed successfully", transfer });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to process payout", error: error.message });
    }
  }

  async getPayouts(req: Req, res: Res) {
    const { status } = req.params;

    try {
      const payouts = await this.payoutUseCase.getPayoutsByStatus(status);
      res.status(200).json(payouts);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch payouts", error: error.message });
    }
  }
}
