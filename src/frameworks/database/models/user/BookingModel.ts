import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    service_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Service', // Reference to the Service model
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
    booking_date: {
        type: Date,
        required: true,
    },
    paymentIntentId: {
        type: String, // ID from the payment processor (e.g., Stripe)
        required: false, // Not required at creation, can be added later
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
