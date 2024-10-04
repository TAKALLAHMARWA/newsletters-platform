import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Déclare la propriété user sur Request
    }
  }
}
