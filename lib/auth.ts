import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_12345";

export interface SessionUser {
  id: number;
  nombre: string;
  email: string;
  rol: "admin" | "editor" | "revisor";
}

export function signToken(user: SessionUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "8h" });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch (error) {
    return null;
  }
}
