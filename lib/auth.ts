// lib/auth.ts
import { compare } from 'bcryptjs'

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH

export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (!ADMIN_PASSWORD_HASH) {
    console.error('ADMIN_PASSWORD_HASH no está definida')
    return false
  }
  return await compare(password, ADMIN_PASSWORD_HASH)
}