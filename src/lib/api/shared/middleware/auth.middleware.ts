import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../services/jwtService/jwt.service';
import { ApiResponses } from '../response/responses';

export class AuthMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly apiResponses: ApiResponses
  ) {}

  async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return this.apiResponses.unauthorizedError(res);
    const result = this.jwtService.authenticateToken(token);
    if (!result) this.apiResponses.unauthorizedError(res);
    (req as any).user = result.userId;
    next();
  }
}
