import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { FormatMessageFilter } from './common/format-message/format-message.filter';
import { FormatMessageInterceptor } from './common/format-message/format-message.interceptor';
import cors from './common/utils/cors';
import { AuthGuard } from './common/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // 使用全局验证器
  app.useGlobalPipes(new ValidationPipe());
  // 使用拦截器
  // 格式化返回数据
  app.useGlobalInterceptors(new FormatMessageInterceptor());
  // 使用过滤器，格式化错误信息
  app.useGlobalFilters(new FormatMessageFilter());

  app.enableCors({
    // 允许跨域的域名
    origin: cors || '*',
  });
  app.setGlobalPrefix('api');
  app.useGlobalGuards(new AuthGuard(app.get(JwtService)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
