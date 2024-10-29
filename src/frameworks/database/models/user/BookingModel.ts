import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    service_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Service', 
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    provider_id:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    booking_date: {
        type: Date,
        required: true,
    },
    sessionId:{
       type:String,
       required:false,
    },
    paymentIntentId: {
        type: String, 
        required: false, 
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'canceled'],
        default: 'pending',
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

// Middleware to update the updated_at field
BookingSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

// Create the Booking model
const BookingModel = mongoose.model('Booking', BookingSchema);

export default BookingModel;
