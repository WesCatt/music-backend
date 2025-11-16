import bcrypt from 'bcrypt';

// 加密
export async function hash(text: string): Promise<string> {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(text, salt);
  return hashedPassword;
}

// 对比
export async function compareHash(
  text: string,
  hashedText: string,
): Promise<boolean> {
  return await bcrypt.compare(text, hashedText);
}
