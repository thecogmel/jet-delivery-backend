import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

declare global {
  interface AuthRequest extends Request {
    user: User;
  }

  interface UserToken {
    access_token: string;
  }

  interface UserPayload {
    sub: number;
    username: string;
    name: string;
    iat?: number;
    exp?: number;
  }
}

export {};
