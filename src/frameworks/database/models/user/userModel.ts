
import mongoose,{CallbackError} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
  
    },
    otp: {
        type: String
    },
    password: {
        type: String
    },
    
    verified: {
      type: Boolean,
      default: false
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    stripeAccountId: {
        type: String,
        default: null // to store connected Stripe account ID for providers
    },

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this as any;  

    // Check if the password is modified
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        
        // Ensure password is a string and hash it
        if (user.password) {
            user.password = await bcrypt.hash(user.password, salt);
        }

        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

export const UserModel = mongoose.model("User", userSchema);
