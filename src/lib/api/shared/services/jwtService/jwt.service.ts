import jwt from 'jsonwebtoken';
import { appConfig } from '../../../../config/app.config';

export class JwtService {
  generateAuthToken(args: { userId: number; username: string }) {
    return jwt.sign(args, appConfig.jwt.secret, { expiresIn: '1h' });
  }

  authenticateToken(token: string) {
    return jwt.verify(token, appConfig.jwt.secret);
  }
}
