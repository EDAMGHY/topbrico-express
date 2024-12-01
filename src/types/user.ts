/**
 * @interface IUser
 * @description User Interface
 * @param {string} name - User's name
 * @param {string} username - User's username
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} role - User's role
 */
export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: string;
}
