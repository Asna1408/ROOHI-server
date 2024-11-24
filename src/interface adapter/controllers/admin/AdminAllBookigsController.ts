import { GetAdminBookingByIdUseCaseInterface } from "../../../entities/useCaseInterfaces/admin/GetAdminBookingByIdUseCaseInterface";
import { GetBookingCountUsecaseInterface } from "../../../entities/useCaseInterfaces/admin/GetBookingCountUsecaseInterface";
import { GetBookingDetailsUsecaseInterface } from "../../../entities/useCaseInterfaces/admin/GetBookingDetailsUsecaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";


export class AdminAllBookingController {
    constructor(private iadminbookinddetailUsecase: GetBookingDetailsUsecaseInterface,
        private igetadminbookingbyidusecaseInterface: GetAdminBookingByIdUseCaseInterface,
        private igetbookingcountusecase : GetBookingCountUsecaseInterface
      ){}
  
    // async getAllBookingDetails(req: Req, res: Res){
    //   try {
        
    //     const bookings = await this.iadminbookinddetailUsecase.getAllBookingDetails();
    //     res.status(200).json(bookings); 
    //   } catch (error) {
    //     console.error('Error fetching booking details:', error);
    //     res.status(500).json({ message: 'Failed to fetch booking details' }); 
    //   }
    // }

    async getAllBookingDetails(req: Req, res: Res) {
      try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        
        const bookings = await this.iadminbookinddetailUsecase.getAllBookingDetails(page, limit);
        res.status(200).json(bookings);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        res.status(500).json({ message: 'Failed to fetch booking details' });
      }
    }
    


    async getBookingById(req: Req, res: Res):Promise<void> {
        const  {bookingId } = req.params;
        try {
          const booking = await this.igetadminbookingbyidusecaseInterface.GetBookingById(bookingId);
          res.status(200).json(booking);
        } catch (error) {
          console.error('Error fetching booking by ID:', error);
          res.status(500).json({ message: 'Failed to fetch booking details' });
        }
      }

      async getBookingCount (req:Req, res:Res) {
        try {
          const count = await this.igetbookingcountusecase.getBookingCount();
          res.status(200).json({ count });
        } catch (error) {
          console.error("Error fetching booking count:", error);
          res.status(500).json({ message: 'Error fetching booking count' });
        }
      };
  }