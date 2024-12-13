import { Req, Res } from "../../../frameworks/Types/servertype";
import { AddServiceCategoryUseCase } from "../../../usecases/admin/AddServiceCategoryUseCase";
import { DeleteServiceCategoryUseCase } from "../../../usecases/admin/DeleteServiceCategoryUseCase";
import { EditServiceCategoryUseCase } from "../../../usecases/admin/EditServiceCategoryUseCase";
import { GetAllServiceCategoryUseCase } from "../../../usecases/admin/GetAllServiceCategoryUseCase";
import { Request, Response } from 'express';



export class GetAllServiceController {
  constructor(private addServiceCategoryUseCase: AddServiceCategoryUseCase,
    private updateServiceCategoryUseCase:  EditServiceCategoryUseCase,
    private deleteServiceCategoryUseCase: DeleteServiceCategoryUseCase,
  private getAllServiceUseCase: GetAllServiceCategoryUseCase) {}


  async addServiceCategory(req: Req, res: Res): Promise<void> {
    const { type_name, description } = req.body;
    try {
      const serviceCategory = await this.addServiceCategoryUseCase.addServiceCategory(type_name, description);
      res.status(201).json(serviceCategory);
    } catch (error) {
      res.status(500).json({ error: 'Unable to add service category' });
    }
  }


  async getServiceCategories(req: Req, res: Res): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1; 
      const limit = parseInt(req.query.limit as string) || 10; 
      const skip = (page - 1) * limit;
  
      const { categories, total } = await this.getAllServiceUseCase.getServiceCategories(skip, limit);
  
      res.status(200).json({ categories, total, currentPage: page, totalPages: Math.ceil(total / limit) });
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve service categories' });
    }
  }
  

  async getServiceCategoryById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const serviceCategory = await this.getAllServiceUseCase.getServiceCategoryById(id);
      if (!serviceCategory) {
         res.status(404).json({ error: 'Service category not found' });
      }
      res.status(200).json(serviceCategory);
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve service category' });
    }
  }

 
  async editServiceCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { type_name, description } = req.body;
    try {
      const updatedServiceCategory = await this.updateServiceCategoryUseCase.editServiceCategory(id, type_name, description);
      if (!updatedServiceCategory) {
        res.status(404).json({ error: 'Service category not found' });
      } else {
        res.status(200).json(updatedServiceCategory);
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to update service category' });
    }
  }

  async deleteServiceCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedServiceCategory = await this.deleteServiceCategoryUseCase.deleteServiceCategory(id);
      if (!deletedServiceCategory) {
        res.status(404).json({ error: 'Service category not found' });
      } else {
        res.status(200).json(deletedServiceCategory);
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete service category' });
    }
  }

}
