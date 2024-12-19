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
exports.PostRepository = void 0;
const ServicesModel_1 = require("../../../frameworks/database/models/user/ServicesModel");
class PostRepository {
    //addservice
    addService(serviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new ServicesModel_1.ServiceModel(serviceData);
                return yield service.save();
            }
            catch (error) {
                console.error("Error saving service to database:", error);
                throw error;
            }
        });
    }
    getServicesByProvider(providerId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const services = yield ServicesModel_1.ServiceModel.find({ provider_id: providerId })
                    .populate("service_type", "type_name")
                    .populate("provider_id", "name email phone location")
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit);
                const total = yield ServicesModel_1.ServiceModel.countDocuments({ provider_id: providerId });
                return { services, total };
            }
            catch (error) {
                throw new Error("Error fetching services");
            }
        });
    }
    //get each service by id
    getPostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ServicesModel_1.ServiceModel.findById(postId).exec();
            }
            catch (error) {
                throw new Error("Error fetching services By Id: " + error);
            }
        });
    }
    //edit service
    updatePost(postId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ServicesModel_1.ServiceModel.findByIdAndUpdate(postId, updatedData, { new: true });
            }
            catch (error) {
                throw new Error("Error updating services: " + error);
            }
        });
    }
    //delete service
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ServicesModel_1.ServiceModel.findByIdAndDelete(postId);
            }
            catch (error) {
                throw new Error("Error deleting services: " + error);
            }
        });
    }
    //To display all service in database in shop
    getAllServices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const services = yield ServicesModel_1.ServiceModel.find()
                    .populate("provider_id")
                    .populate("service_type");
                return services;
            }
            catch (error) {
                throw new Error("Error fetching services: " + error);
            }
        });
    }
    //get single service 
    getsingleservice(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield ServicesModel_1.ServiceModel.findById(serviceId).populate("provider_id", "name").exec();
                return service;
            }
            catch (error) {
                throw new Error(`Error fetching service: ${error}`);
            }
        });
    }
}
exports.PostRepository = PostRepository;
