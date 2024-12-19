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
exports.GetAllUserController = void 0;
class GetAllUserController {
    constructor(getalluserusecase, blockUserUseCase, unblockUserUseCase, igetusercountusecase) {
        this.getalluserusecase = getalluserusecase;
        this.blockUserUseCase = blockUserUseCase;
        this.unblockUserUseCase = unblockUserUseCase;
        this.igetusercountusecase = igetusercountusecase;
    }
    GetAllUserControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const skip = (page - 1) * limit;
                const { users, total } = yield this.getalluserusecase.GetAllUsers(skip, limit);
                res.status(200).json({ users, total, currentPage: page, totalPages: Math.ceil(total / limit) });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error fetching users" });
            }
        });
    }
    BlockUserControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield this.blockUserUseCase.BlockUsers(userId);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: "Error blocking user" });
            }
        });
    }
    UnblockUserControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield this.unblockUserUseCase.UnBlockUsers(userId);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: "Error unblocking user" });
            }
        });
    }
    getUserCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.igetusercountusecase.getUserCount();
                res.status(200).json({ count });
            }
            catch (error) {
                console.error("Error fetching user count:", error);
                res.status(500).json({ message: 'Error fetching user count' });
            }
        });
    }
    ;
}
exports.GetAllUserController = GetAllUserController;
