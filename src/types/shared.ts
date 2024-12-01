import { Request as RequestExpress } from 'express';

export interface Request extends RequestExpress {
  permission?: string;
  user?: {
    /**
     * Current user's name
     */
    name: string;
    /**
     * Current user's username
     */
    username: string;
    /**
     * Current user's id
     */
    userId: string;
    /**
     * Current user's role id
     */
    role: string;
    /**
     * IssuedAt timestamp
     */
    iat: number;
    /**
     * Expiry timestamp
     */
    exp: number;
  };
}

export interface IFilterExpress {
  [key: string | number]:
    | {
        $regex?: string;
        $lte?: Date | string;
        $gte?: Date | string;
        $options?: string;
      }
    | string
    | number;
}
export interface ISortExpress {
  [key: string]: 'asc' | 'desc';
}
