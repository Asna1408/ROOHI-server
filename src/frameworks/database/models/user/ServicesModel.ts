import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
   
    service_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location:{
        type:String,
        required:true,
    },
    price: {
      type: Number,
      required: true,
    },
    provider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      
    },
    service_type: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ServiceCategory', 
      required: true,
    },
    availability: {
      type: [Date],
      default:[],
      required: true,
    },
    images: {
      type: [String], // URL of the service image
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  export const ServiceModel = mongoose.model('Service', ServiceSchema);
  