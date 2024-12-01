import mongoose from 'mongoose';

import { env } from './env';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB Connected....`.bgGreen);
  } catch (err) {
    console.log(`MongoDB Error : ${err}`.bgRed);
  }
};
