import mongoose from 'mongoose';
import env from 'dotenv';

env.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
