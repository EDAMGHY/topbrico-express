import mongoose from 'mongoose';

/**
 * @interface INote
 * @description Note Interface
 * @param {string} name - Note's name
 * @param {string} content - Note's content
 * @param {string} user - Note user's id
 */
export interface INote {
  name: string;
  content: string;
  user: mongoose.Schema.Types.ObjectId; // Reference to the user
}
