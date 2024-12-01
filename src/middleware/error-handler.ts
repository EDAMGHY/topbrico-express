// import { Request, Response, NextFunction } from "express";
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomError, IErrorHandlerMiddleware } from './types';
import { responseObject } from '@/lib';

// export default (err, req: Request, res: Response, next: NextFunction) => {
export const errorHandlerMiddleware = (
  // eslint-disable-next-line
  err: IErrorHandlerMiddleware,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction,
) => {
  console.log(`[${err?.name}]:${err?.toString?.()}`.bgRed);

  const customError: CustomError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item: { [key: string]: string | number | boolean }) => item.message)
      .join(',');
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    ).join(', ')} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res
    .status(customError.statusCode)
    .json(responseObject(customError.msg, null, false));
};
