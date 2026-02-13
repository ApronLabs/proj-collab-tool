import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

export function verifySessionToken(token: string): { sub: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string };
  } catch {
    return null;
  }
}
