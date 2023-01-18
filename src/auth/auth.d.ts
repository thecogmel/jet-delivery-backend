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
