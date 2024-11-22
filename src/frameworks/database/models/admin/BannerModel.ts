import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({

    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    images: { 
        type: [String], 
        required: true 
    },
    isActive: { 
        type: Boolean,  
    },  
    
    },
    {
      timestamps: true,  
    }
)

export const BannerModel = mongoose.model("Banner", BannerSchema);