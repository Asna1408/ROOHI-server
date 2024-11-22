import { AdminDashboardUsecaseInterface } from "../../../entities/useCaseInterfaces/admin/AdminDashboardUsecaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";

export class AdminDashboardController{
    constructor( private iadminDashboard:AdminDashboardUsecaseInterface ){}


    async getRevenue(req:Req, res:Res) {
        try {
          const metrics = await this.iadminDashboard.totalRevenue();
          res.json(metrics);
        } catch (err) {
          res.status(500).json({ error: 'Server Error' });
        }
      };

      

      async getRevenueOvertime(req: Req, res: Res) {
        const filter = typeof req.query.filter === "string" ? req.query.filter : "month"; // Ensure filter is a string
      
        try {
          const metrics = await this.iadminDashboard.revenueOverTime(filter);
          res.json(metrics);
        } catch (err) {
          res.status(500).json({ error: "Server Error" });
        }
      }
      


      async getbookingStatusDistribution(req:Req, res:Res) {
        try {
          const metrics = await this.iadminDashboard.bookingStatusDistribution();
          res.json(metrics);
        } catch (err) {
          res.status(500).json({ error: 'Server Error' });
        }
      };



}