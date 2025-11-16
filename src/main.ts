import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { FormatMessageFilter } from './common/filters/format-message.filter';
import { FormatMessageInterceptor } from './common/interceptors/format-message.interceptor';
import cors from './common/utils/cors';
import { AuthGuard } from './common/guards/auth.guard';
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

  // 全局守卫
  app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
