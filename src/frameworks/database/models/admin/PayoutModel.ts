import mongoose from "mongoose";

const PayoutSchema = new mongoose.Schema({
    providerId: 
    { type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        
    },
    amount: { 
        type: Number, 
        required: true 
    },
    currency: { 
        type: String, 
        required: true, 
        default: 'inr' 
    },
    stripeTransferId: {
         type: String, 
         required: false,
        },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        default: 'pending' 
    },
  }, { timestamps: true });
  
  export  const Payout = mongoose.model('Payout', PayoutSchema);
  