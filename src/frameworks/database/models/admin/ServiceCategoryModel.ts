import mongoose from "mongoose";

const ServiceCategorySchema = new mongoose.Schema({

    type_name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      
    },
    {
      timestamps: true,  
    }
)

export const ServiceCategoryModel = mongoose.model("ServiceCategory", ServiceCategorySchema);