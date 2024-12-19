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
exports.BannerController = void 0;
class BannerController {
    constructor(icreatebannerusecaseinterface, igetallbannerusecaseinterface, igetBannerByIdusecaseinterface, iupdateBannerusecaseinterface, ideleteBannerusecaseinterface) {
        this.icreatebannerusecaseinterface = icreatebannerusecaseinterface;
        this.igetallbannerusecaseinterface = igetallbannerusecaseinterface;
        this.igetBannerByIdusecaseinterface = igetBannerByIdusecaseinterface;
        this.iupdateBannerusecaseinterface = iupdateBannerusecaseinterface;
        this.ideleteBannerusecaseinterface = ideleteBannerusecaseinterface;
    }
    createBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Request body:", req.body);
                // Extract data from request body
                const { title, description, isActive } = req.body;
                if (!title || !description) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
                const BannerData = req.body;
                const newBanner = yield this.icreatebannerusecaseinterface.createBanner(BannerData);
                return res.status(201).json({ message: "Banner created successfully", Banner: newBanner });
            }
            catch (error) {
                console.error("Error adding Banner:", error);
                return res.status(500).json({ message: "Internal server error", error: error });
            }
        });
    }
    GetAllBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page, 10) || 1;
                const limit = parseInt(req.query.limit, 10) || 10;
                const skip = (page - 1) * limit;
                const { banners, total } = yield this.igetallbannerusecaseinterface.getBanners(skip, limit);
                res.status(200).json({
                    banners,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                });
            }
            catch (error) {
                console.error('Error fetching Banners:', error);
                res.status(500).json({ message: error });
            }
        });
    }
    editBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const BannerId = req.params.BannerId;
                const updatedData = req.body;
                const updatedBanner = yield this.iupdateBannerusecaseinterface.updateBanner(BannerId, updatedData);
                if (!updatedBanner) {
                    return res.status(404).json({ message: "Banner not found" });
                }
                return res.status(200).json({ message: "Banner updated successfully", updatedBanner });
            }
            catch (error) {
                console.error("Error updating banner:", error);
                return res.status(500).json({ message: "Internal server error", error });
            }
        });
    }
    getBannerbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { BannerId } = req.params;
            try {
                const Banner = yield this.igetBannerByIdusecaseinterface.getBannerById(BannerId);
                if (!Banner) {
                    return res.status(404).json({ message: 'Banner not found' });
                }
                return res.status(200).json(Banner);
            }
            catch (error) {
                return res.status(500).json({ message: 'Server error', error: error });
            }
        });
    }
    deleteBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const BannerId = req.params.BannerId;
                const deletedBanner = yield this.ideleteBannerusecaseinterface.deleteBanner(BannerId);
                if (!deletedBanner) {
                    return res.status(404).json({ message: "Banner not found" });
                }
                return res.status(200).json({ message: "Banner deleted successfully" });
            }
            catch (error) {
                console.error("Error deleting Banner:", error);
                return res.status(500).json({ message: "Internal server error", error });
            }
        });
    }
}
exports.BannerController = BannerController;
