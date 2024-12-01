import bcrypt from 'bcryptjs';
import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from 'validator';

import { IUser } from '@/types';

// Extend the IUser interface with Mongoose's Document
export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the schema
const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Please provide a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
  },
  { timestamps: true },
);

// Add a pre-save hook for password hashing
userSchema.pre<IUserDocument>('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Add an instance method for password comparison
userSchema.methods.comparePassword = async function (
  this: IUserDocument,
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Define the model
const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  'User',
  userSchema,
);

// Export the model and the interface
export default UserModel;
export type { IUser };
