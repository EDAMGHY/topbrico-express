import mongoose, { Schema, Document, Model } from 'mongoose';

import { INote } from '@/types';

// Extend the INote interface with Mongoose's Document
export interface INoteDocument extends INote, Document {}

// Define the schema
const noteSchema = new Schema<INoteDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a note name'],
    },
    content: {
      type: String,
      required: [true, 'Please provide a note content'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user id'],
    },
  },
  { timestamps: true },
);

// Define the model
const NoteModel: Model<INoteDocument> = mongoose.model<INoteDocument>(
  'Note',
  noteSchema,
);

// Export the model and the interface
export default NoteModel;
export type { INote };
