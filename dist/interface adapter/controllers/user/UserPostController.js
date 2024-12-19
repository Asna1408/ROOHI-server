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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class UserPostController {
    constructor(iuserpostaddusecase, usergetpostusecaseinterface, userdeletepostusercaseinterface, usergetpostbyidusecaseinterface, usereditpostusecaseinterface, userfetchallpostusecaseinterface, usergetsingleserviceinterface, getserviceavailabilityusecaseInterfcae) {
        this.iuserpostaddusecase = iuserpostaddusecase;
        this.usergetpostusecaseinterface = usergetpostusecaseinterface;
        this.userdeletepostusercaseinterface = userdeletepostusercaseinterface;
        this.usergetpostbyidusecaseinterface = usergetpostbyidusecaseinterface;
        this.usereditpostusecaseinterface = usereditpostusecaseinterface;
        this.userfetchallpostusecaseinterface = userfetchallpostusecaseinterface;
        this.usergetsingleserviceinterface = usergetsingleserviceinterface;
        this.getserviceavailabilityusecaseInterfcae = getserviceavailabilityusecaseInterfcae;
    }
    createService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Request body:", req.body);
                const { service_name, description, price, provider_id, service_type, availability } = req.body;
                if (!service_name || !description || !price || !provider_id || !service_type || !availability) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
                const serviceData = req.body;
                const newService = yield this.iuserpostaddusecase.createService(serviceData);
                return res.status(201).json({ message: "Service created successfully", service: newService });
            }
            catch (error) {
                console.error("Error adding service:", error);
                return res.status(500).json({ message: "Internal server error", error: error });
            }
        });
    }
    GetAllPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Full URL:", req.originalUrl);
                console.log("Provider ID from Params:", req.params.providerId);
                const providerId = new mongoose_1.default.Types.ObjectId(req.params.providerId);
                console.log("Converted Provider ID:", providerId);
                const page = parseInt(req.query.page, 10) || 1; // Default to page 1
                const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
                const skip = (page - 1) * limit;
                const { services, total } = yield this.usergetpostusecaseinterface.GetAllPost(providerId, skip, limit);
                console.log("Fetched Services:", services);
                res.status(200).json({
                    services,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                });
            }
            catch (error) {
                console.error("Error fetching services:", error);
                res.status(500).json({ message: error });
            }
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = req.params;
            try {
                const post = yield this.usergetpostbyidusecaseinterface.getPostById(postId);
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                return res.status(200).json(post);
            }
            catch (error) {
                return res.status(500).json({ message: 'Server error', error: error });
            }
        });
    }
    editPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = new mongoose_1.default.Types.ObjectId(req.params.postId);
                const updatedData = req.body;
                const updatedPost = yield this.usereditpostusecaseinterface.updatePost(postId, updatedData);
                if (!updatedPost) {
                    return res.status(404).json({ message: "Post not found" });
                }
                return res.status(200).json({ message: "Post updated successfully", updatedPost });
            }
            catch (error) {
                console.error("Error updating post:", error);
                return res.status(500).json({ message: "Internal server error", error });
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = new mongoose_1.default.Types.ObjectId(req.params.postId);
                const deletedPost = yield this.userdeletepostusercaseinterface.deletePost(postId);
                if (!deletedPost) {
                    return res.status(404).json({ message: "Post not found" });
                }
                return res.status(200).json({ message: "Post deleted successfully" });
            }
            catch (error) {
                console.error("Error deleting post:", error);
                return res.status(500).json({ message: "Internal server error", error });
            }
        });
    }
    getAllServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const services = yield this.userfetchallpostusecaseinterface.fetchAllServices();
                res.status(200).json(services);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    ;
    //get single service
    getsingleService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceId = new mongoose_1.default.Types.ObjectId(req.params.id);
            try {
                const service = yield this.usergetsingleserviceinterface.getsingleservice(serviceId);
                if (!service) {
                    return res.status(404).json({ message: "Service not found" });
                }
                return res.json(service);
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
    getAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceId } = req.params;
                const availability = yield this.getserviceavailabilityusecaseInterfcae.getdates(serviceId);
                res.status(200).json(availability);
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
}
exports.UserPostController = UserPostController;
