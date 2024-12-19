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
exports.DeleteServiceCategoryUseCase = void 0;
class DeleteServiceCategoryUseCase {
    constructor(iadminrepository) {
        this.iadminrepository = iadminrepository;
    }
    deleteServiceCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.iadminrepository.deleteServiceCategory(id);
            }
            catch (error) {
                throw new Error("Error occured when deleting category");
            }
        });
    }
}
exports.DeleteServiceCategoryUseCase = DeleteServiceCategoryUseCase;
