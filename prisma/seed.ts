import { PrismaClient } from '../generated/prisma/client';
import { hash } from '../src/common/utils/hash';

// 与token密钥一致

const users: {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
}[] = [
  {
    username: 'WesCatt',
    email: 'zzxcmdyx@163.com',
    password: '12345678',
    role: 'ADMIN',
  },
  {
    username: 'Sakura50',
    role: 'USER',
    password: '070312qw',
    email: '1036449534@qq.com',
  },
  {
    username: 'Sakura50',
    role: 'USER',
    password: '070312qw',
    email: 'wuhaoonezero@gmail.com',
  },
];

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    const { username, email, role, password } = user;
    const hashed = await hash(password);
    await prisma.user.create({
      data: {
        username,
        email,
        role,
        password: hashed,
      },
    });
  }
}

main()
  .then(() => {
    console.log('添加成功');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
