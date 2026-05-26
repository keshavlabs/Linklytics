import bcrypt from "bcrypt";
import prisma from "../prisma/client.js";
import { env } from "../config/env.js";

export async function registerUser({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already registered");

  const rounds = parseInt(env.BCRYPT_ROUNDS, 10) || 10;
  const hashed = await bcrypt.hash(password, rounds);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return user;
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid email or password");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, createdAt: true },
  });
}

export async function updateUserProfile(id, { name, email }) {
  if (email) {
    const existing = await prisma.user.findFirst({
      where: { email, NOT: { id } },
    });
    if (existing) throw new Error("Email already in use");
  }

  return prisma.user.update({
    where: { id },
    data: { ...(name && { name }), ...(email && { email }) },
    select: { id: true, name: true, email: true, createdAt: true },
  });
}

export async function updatePassword(id, currentPassword, newPassword) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) throw new Error("Current password is incorrect");

  const rounds = parseInt(env.BCRYPT_ROUNDS, 10) || 10;
  const hashed = await bcrypt.hash(newPassword, rounds);
  await prisma.user.update({ where: { id }, data: { password: hashed } });
}
