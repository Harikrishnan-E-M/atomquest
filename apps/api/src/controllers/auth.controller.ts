import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.model';
import { signAccessToken } from '../utils/jwt';

function sanitizeUser(user: { _id: unknown; name: string; email: string; role: string; department?: string }) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department ?? '',
  };
}

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body as {
    name?: string;
    email?: string;
    password?: string;
    role?: 'employee' | 'manager' | 'admin';
  };

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name,
    email,
    passwordHash,
    role: role ?? 'employee',
  });

  const token = signAccessToken({ userId: String(user._id), role: user.role });

  return res.status(201).json({
    message: 'User registered successfully',
    token,
    user: sanitizeUser(user),
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (!user || !user.isActive) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signAccessToken({ userId: String(user._id), role: user.role });

  return res.json({
    message: 'Login successful',
    token,
    user: sanitizeUser(user),
  });
}

export async function me(req: Request, res: Response) {
  if (!req.auth) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const user = await UserModel.findById(req.auth.userId).lean();
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    },
  });
}

export async function logout(_req: Request, res: Response) {
  return res.json({ message: 'Logout successful' });
}
