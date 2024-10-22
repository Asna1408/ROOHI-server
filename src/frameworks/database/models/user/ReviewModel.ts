import mongoose, { Schema } from "mongoose";

const ReviewSchema: Schema = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    service_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service', 
        required: true
    },
    
    rating: { 
        type: Number, 
        required: true, 
        min: 1, max: 5 
    },
    review: { 
        type: String, 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
  });
  
  const ReviewModel = mongoose.model('Review', ReviewSchema);

export default ReviewModel;