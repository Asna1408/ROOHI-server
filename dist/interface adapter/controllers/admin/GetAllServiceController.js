"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllServiceController = void 0;
class GetAllServiceController {
    constructor(addServiceCategoryUseCase, updateServiceCategoryUseCase, deleteServiceCategoryUseCase, getAllServiceUseCase) {
        this.addServiceCategoryUseCase = addServiceCategoryUseCase;
        this.updateServiceCategoryUseCase = updateServiceCategoryUseCase;
        this.deleteServiceCategoryUseCase = deleteServiceCategoryUseCase;
        this.getAllServiceUseCase = getAllServiceUseCase;
    }
    addServiceCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type_name, description } = req.body;
            try {
                const serviceCategory = yield this.addServiceCategoryUseCase.addServiceCategory(type_name, description);
                res.status(201).json(serviceCategory);
            }
            catch (error) {
                res.status(500).json({ error: 'Unable to add service category' });
            }
        });
    }
    getServiceCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const skip = (page - 1) * limit;
                const { categories, total } = yield this.getAllServiceUseCase.getServiceCategories(skip, limit);
                res.status(200).json({ categories, total, currentPage: page, totalPages: Math.ceil(total / limit) });
            }
            catch (error) {
                res.status(500).json({ error: 'Unable to retrieve service categories' });
            }
        });
    }
    getServiceCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const serviceCategory = yield this.getAllServiceUseCase.getServiceCategoryById(id);
                if (!serviceCategory) {
                    res.status(404).json({ error: 'Service category not found' });
                }
                res.status(200).json(serviceCategory);
            }
            catch (error) {
                res.status(500).json({ error: 'Unable to retrieve service category' });
            }
        });
    }
    editServiceCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { type_name, description } = req.body;
            try {
                const updatedServiceCategory = yield this.updateServiceCategoryUseCase.editServiceCategory(id, type_name, description);
                if (!updatedServiceCategory) {
                    res.status(404).json({ error: 'Service category not found' });
                }
                else {
                    res.status(200).json(updatedServiceCategory);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Unable to update service category' });
            }
        });
    }
    deleteServiceCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedServiceCategory = yield this.deleteServiceCategoryUseCase.deleteServiceCategory(id);
                if (!deletedServiceCategory) {
                    res.status(404).json({ error: 'Service category not found' });
                }
                else {
                    res.status(200).json(deletedServiceCategory);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Unable to delete service category' });
            }
        });
    }
}
exports.GetAllServiceController = GetAllServiceController;
