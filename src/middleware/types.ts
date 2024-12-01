import { MongooseError } from 'mongoose';

export interface CustomError {
  statusCode: number;
  msg: string;
}

export type IErrorHandlerMiddleware = Error &
  Partial<MongooseError> & {
    statusCode: number;
    code: number;
    keyValue: { [key: string]: string }[];
    name: string;
    errors: { [key: string]: string | number | boolean }[];
    value: string | number | boolean;
  };
