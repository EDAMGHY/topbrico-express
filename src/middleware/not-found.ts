import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { responseObject } from '@/lib';

export const notFoundMiddleware = (req: Request, res: Response) =>
  res
    .status(StatusCodes.NOT_FOUND)
    .json(responseObject('Resource does not exist', null, false));
