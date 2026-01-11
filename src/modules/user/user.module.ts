import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

// 表示全局可用
@Global()
@Module({
  // 表示注册服务
  providers: [UserService],
  // 表示控制层
  controllers: [UserController],
  //   表示该模块中可以被导出的服务
  exports: [UserService],
})
export class UserModule {}
